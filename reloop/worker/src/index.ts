import type { Env, Platform, ProRecord } from "./types";
import { corsHeaders, json } from "./cors";
import { generateRepurposedContent } from "./anthropic";
import { createCheckoutSession, getCustomerEmail, verifyStripeSignature } from "./stripe";

const ALL_PLATFORMS: Platform[] = ["linkedin", "x", "instagram", "shortvideo", "email"];

function todayKey(ip: string): string {
  const date = new Date().toISOString().slice(0, 10);
  return `usage:${ip}:${date}`;
}

async function isPro(env: Env, email: string | null): Promise<boolean> {
  if (!email) return false;
  const raw = await env.RELOOP_KV.get(`pro:${email.toLowerCase()}`);
  if (!raw) return false;
  const record = JSON.parse(raw) as ProRecord;
  return record.status === "active";
}

async function handleGenerate(req: Request, env: Env): Promise<Response> {
  const body = (await req.json().catch(() => null)) as {
    content?: string;
    platforms?: string[];
    tone?: string;
  } | null;

  if (!body || typeof body.content !== "string" || body.content.trim().length < 20) {
    return json({ error: "Content is required." }, 400, env);
  }

  const platforms = (body.platforms ?? []).filter((p): p is Platform =>
    ALL_PLATFORMS.includes(p as Platform)
  );
  if (platforms.length === 0) {
    return json({ error: "Pick at least one platform." }, 400, env);
  }
  if (body.content.length > 20000) {
    return json({ error: "Content is too long (20,000 character limit)." }, 400, env);
  }

  const email = req.headers.get("x-user-email");
  const pro = await isPro(env, email);

  const limit = Number(env.FREE_DAILY_LIMIT || "3");
  const ip = req.headers.get("cf-connecting-ip") ?? "unknown";
  const key = todayKey(ip);
  let used = 0;

  if (!pro) {
    used = Number((await env.RELOOP_KV.get(key)) ?? "0");
    if (used >= limit) {
      return json({ error: "Daily free limit reached." }, 429, env);
    }
  }

  try {
    const tone = typeof body.tone === "string" ? body.tone : "Professional";
    const results = await generateRepurposedContent(env, body.content, platforms, tone);

    let remaining: number | null = null;
    if (!pro) {
      await env.RELOOP_KV.put(key, String(used + 1), { expirationTtl: 60 * 60 * 26 });
      remaining = limit - used - 1;
    }

    return json({ results, remaining, pro }, 200, env);
  } catch (err) {
    return json(
      { error: err instanceof Error ? err.message : "Generation failed." },
      502,
      env
    );
  }
}

async function handleCreateCheckoutSession(req: Request, env: Env): Promise<Response> {
  const body = (await req.json().catch(() => null)) as { email?: string } | null;
  if (!body || typeof body.email !== "string" || !body.email.includes("@")) {
    return json({ error: "A valid email is required." }, 400, env);
  }

  try {
    const url = await createCheckoutSession(env, body.email);
    return json({ url }, 200, env);
  } catch (err) {
    return json(
      { error: err instanceof Error ? err.message : "Could not start checkout." },
      502,
      env
    );
  }
}

async function handleStatus(req: Request, env: Env): Promise<Response> {
  const url = new URL(req.url);
  const email = url.searchParams.get("email");
  return json({ pro: await isPro(env, email) }, 200, env);
}

async function handleWebhook(req: Request, env: Env): Promise<Response> {
  const payload = await req.text();
  const signature = req.headers.get("stripe-signature");
  const valid = await verifyStripeSignature(payload, signature, env.STRIPE_WEBHOOK_SECRET);
  if (!valid) {
    return new Response("Invalid signature", { status: 400 });
  }

  const event = JSON.parse(payload) as {
    type: string;
    data: { object: Record<string, unknown> };
  };

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as {
      customer_email?: string;
      customer_details?: { email?: string };
      customer?: string;
      subscription?: string;
    };
    const email = session.customer_email ?? session.customer_details?.email;
    if (email && session.customer) {
      const record: ProRecord = {
        status: "active",
        customerId: session.customer,
        subscriptionId: session.subscription,
      };
      await env.RELOOP_KV.put(`pro:${email.toLowerCase()}`, JSON.stringify(record));
      await env.RELOOP_KV.put(`customer:${session.customer}`, email.toLowerCase());
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as { customer?: string };
    if (subscription.customer) {
      const email = await env.RELOOP_KV.get(`customer:${subscription.customer}`);
      const resolvedEmail = email ?? (await getCustomerEmail(env, subscription.customer));
      if (resolvedEmail) {
        const raw = await env.RELOOP_KV.get(`pro:${resolvedEmail.toLowerCase()}`);
        const record: ProRecord = raw
          ? { ...(JSON.parse(raw) as ProRecord), status: "canceled" }
          : { status: "canceled", customerId: subscription.customer };
        await env.RELOOP_KV.put(`pro:${resolvedEmail.toLowerCase()}`, JSON.stringify(record));
      }
    }
  }

  return new Response("ok", { status: 200 });
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);

    if (req.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(env) });
    }

    if (url.pathname === "/api/generate" && req.method === "POST") {
      return handleGenerate(req, env);
    }
    if (url.pathname === "/api/create-checkout-session" && req.method === "POST") {
      return handleCreateCheckoutSession(req, env);
    }
    if (url.pathname === "/api/status" && req.method === "GET") {
      return handleStatus(req, env);
    }
    if (url.pathname === "/api/webhook" && req.method === "POST") {
      return handleWebhook(req, env);
    }

    return json({ error: "Not found" }, 404, env);
  },
};
