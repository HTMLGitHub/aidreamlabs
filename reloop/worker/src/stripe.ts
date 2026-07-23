import type { Env } from "./types";

const STRIPE_API = "https://api.stripe.com/v1";

async function stripeRequest(
  env: Env,
  path: string,
  body: Record<string, string>
): Promise<Record<string, unknown>> {
  const res = await fetch(`${STRIPE_API}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      "content-type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(body).toString(),
  });

  const raw = await res.text();
  let data: Record<string, unknown>;
  try {
    data = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    throw new Error(`Stripe returned a non-JSON response (${res.status}): ${raw.slice(0, 200)}`);
  }
  if (!res.ok) {
    const message =
      (data.error as { message?: string } | undefined)?.message ??
      "Stripe request failed";
    throw new Error(message);
  }
  return data;
}

export async function createCheckoutSession(
  env: Env,
  email: string
): Promise<string> {
  const session = await stripeRequest(env, "/checkout/sessions", {
    mode: "subscription",
    customer_email: email,
    "line_items[0][price]": env.STRIPE_PRICE_ID,
    "line_items[0][quantity]": "1",
    success_url: `${env.APP_URL}/success`,
    cancel_url: `${env.APP_URL}/cancel`,
  });
  return session.url as string;
}

export async function getCustomerEmail(
  env: Env,
  customerId: string
): Promise<string | null> {
  const res = await fetch(`${STRIPE_API}/customers/${customerId}`, {
    headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}` },
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { email?: string };
  return data.email ?? null;
}

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}

function bytesToHex(bytes: ArrayBuffer): string {
  return Array.from(new Uint8Array(bytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Verifies a Stripe webhook signature per https://stripe.com/docs/webhooks/signatures */
export async function verifyStripeSignature(
  payload: string,
  signatureHeader: string | null,
  secret: string
): Promise<boolean> {
  if (!signatureHeader) return false;

  const parts = Object.fromEntries(
    signatureHeader.split(",").map((p) => {
      const [k, v] = p.split("=");
      return [k, v];
    })
  );
  const timestamp = parts.t;
  const signature = parts.v1;
  if (!timestamp || !signature) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signed = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(`${timestamp}.${payload}`)
  );

  const expected = bytesToHex(signed);

  // constant-time compare
  const expectedBytes = hexToBytes(expected);
  const actualBytes = hexToBytes(signature);
  if (expectedBytes.length !== actualBytes.length) return false;
  let diff = 0;
  for (let i = 0; i < expectedBytes.length; i++) {
    diff |= expectedBytes[i] ^ actualBytes[i];
  }
  return diff === 0;
}
