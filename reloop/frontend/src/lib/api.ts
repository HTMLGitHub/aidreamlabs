const API_BASE = import.meta.env.VITE_API_BASE ?? "/api";

export type Platform = "linkedin" | "x" | "instagram" | "shortvideo" | "email";

export const PLATFORMS: { id: Platform; label: string }[] = [
  { id: "linkedin", label: "LinkedIn post" },
  { id: "x", label: "X / Twitter thread" },
  { id: "instagram", label: "Instagram caption" },
  { id: "shortvideo", label: "Short-video hook + script" },
  { id: "email", label: "Email newsletter blurb" },
];

export interface GenerateResult {
  platform: Platform;
  text: string;
}

export interface GenerateResponse {
  results: GenerateResult[];
  remaining: number | null;
  pro: boolean;
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

function getStoredEmail(): string | null {
  return localStorage.getItem("reloop_email");
}

export function setStoredEmail(email: string) {
  localStorage.setItem("reloop_email", email);
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const email = getStoredEmail();
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(email ? { "x-user-email": email } : {}),
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }));
    throw new ApiError(body.error ?? "Something went wrong", res.status);
  }

  return res.json() as Promise<T>;
}

export function generate(content: string, platforms: Platform[], tone: string) {
  return request<GenerateResponse>("/generate", {
    method: "POST",
    body: JSON.stringify({ content, platforms, tone }),
  });
}

export function createCheckoutSession(email: string) {
  return request<{ url: string }>("/create-checkout-session", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export function getStatus(email: string) {
  return request<{ pro: boolean }>(`/status?email=${encodeURIComponent(email)}`);
}
