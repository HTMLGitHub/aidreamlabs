export interface Env {
  RELOOP_KV: KVNamespace;
  ALLOWED_ORIGIN: string;
  APP_URL: string;
  FREE_DAILY_LIMIT: string;
  MODEL: string;
  STRIPE_PRICE_ID: string;
  ANTHROPIC_API_KEY: string;
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
}

export type Platform = "linkedin" | "x" | "instagram" | "shortvideo" | "email";

export interface ProRecord {
  status: "active" | "canceled";
  customerId: string;
  subscriptionId?: string;
}
