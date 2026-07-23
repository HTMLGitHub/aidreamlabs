# Reloop

Turn one piece of content into a week of posts. Paste a blog post, podcast
transcript, or update once — Reloop repurposes it into platform-native drafts
for LinkedIn, X/Twitter, Instagram, short-form video, and email.

This is a standalone product, independent of the `aidreamlab/` site in this
repo — it does not share code, deploy pipeline, or domain with it.

## Why this product

Research into 2026 micro-SaaS trends consistently names AI-powered content
repurposing as one of the highest-demand categories for solo-built SaaS:
proven willingness to pay ($19–99/mo), comps already validating the market
(Repurpose.io, Taplio), high margins (it's mostly an LLM API call), and fast
time-to-value (a user gets a usable result on their very first try, with no
onboarding).

## How it makes money

- **Free tier**: 3 repurposes/day, rate-limited by IP, no signup.
- **Pro — $19/mo**: unlimited repurposes, via Stripe Checkout subscription.
- Upgrade path is a single email field → Stripe Checkout → webhook grants
  access. No password, no full auth system — intentionally, to keep signup
  friction near zero (a proven lever for early conversion in self-serve SaaS).

**Being direct about what this build gets you vs. what still depends on you:**
this repo contains a fully working product — a real landing page, a working
AI feature, and real Stripe subscription billing wiring. It does **not**,
and cannot, come with paying customers. Revenue requires you to (1) plug in
real API/Stripe keys, (2) deploy it, and (3) get it in front of people who
have the problem (SEO, X/LinkedIn content, Product Hunt, communities, cold
outreach — pick a channel and run it consistently). No SaaS makes money by
existing; this removes the "build it" excuse, not the "sell it" work.

## Architecture

```
reloop/
├─ frontend/     Vite + React + TypeScript + Tailwind CSS (static site)
└─ worker/       Cloudflare Worker (API: generate, checkout, webhook, status)
```

Same low-overhead pattern as `aidreamlab/worker` elsewhere in this repo:
a static frontend (deployable anywhere — Cloudflare Pages, Vercel, Netlify)
talking to a Cloudflare Worker that holds the secrets and does anything
that needs them. No server to manage, generous free tiers on both sides.

- **AI**: Anthropic Messages API (Claude), called directly via `fetch` —
  no SDK dependency, keeps the Worker bundle tiny.
- **Payments**: Stripe Checkout (subscriptions) + webhook, called directly
  via `fetch` against the Stripe REST API — same reasoning.
- **Storage**: a single Cloudflare KV namespace for two things — free-tier
  usage counters (`usage:<ip>:<date>`) and Pro subscriber status
  (`pro:<email>`). No database needed at this scale.

## Local development

### 1. Worker (API)

```bash
cd reloop/worker
npm install
cp .dev.vars.example .dev.vars   # fill in real test-mode keys
npm run dev                       # runs on http://localhost:8787
```

You need, at minimum, an `ANTHROPIC_API_KEY` in `.dev.vars` for the core
tool to work. Stripe keys are only needed to test the upgrade flow.

### 2. Frontend

```bash
cd reloop/frontend
npm install
npm run dev                       # runs on http://localhost:5173
```

`vite.config.ts` proxies `/api/*` to `http://127.0.0.1:8787`, so the two
dev servers talk to each other with zero extra config.

## Deploying

### Worker

1. `wrangler kv namespace create RELOOP_KV` and paste the returned id into
   `reloop/worker/wrangler.toml` under `[[kv_namespaces]]`.
2. Set real secrets:
   ```bash
   cd reloop/worker
   npx wrangler secret put ANTHROPIC_API_KEY
   npx wrangler secret put STRIPE_SECRET_KEY
   npx wrangler secret put STRIPE_WEBHOOK_SECRET
   ```
3. In Stripe: create a $19/mo recurring Price, put its `price_...` id into
   `STRIPE_PRICE_ID` in `wrangler.toml`. Create a webhook endpoint pointing
   at `https://<your-worker>.workers.dev/api/webhook` listening for
   `checkout.session.completed` and `customer.subscription.deleted`; put
   its signing secret into `STRIPE_WEBHOOK_SECRET` above.
4. Update `ALLOWED_ORIGIN` and `APP_URL` in `wrangler.toml` to your real
   frontend domain once you have one.
5. `npm run deploy`.

### Frontend

Any static host works (Cloudflare Pages, Vercel, Netlify, GitHub Pages on
a separate repo/domain — this repo's Pages slot is already used by
`aidreamlab/`). Set `VITE_API_BASE` to your deployed Worker's URL, then:

```bash
cd reloop/frontend
npm run build   # outputs to dist/
```

## Known v1 limitations (by design, to ship fast)

- **Auth is email-only, not a real account system.** Pro status is looked
  up by the email a user types in, stored in `localStorage`. It's the
  standard early-stage micro-SaaS shortcut to cut signup friction to zero;
  swap in real auth (magic links, OAuth) once retention/security actually
  demand it.
- **Rate limiting is per-IP**, which is easy to reset (VPN, new network).
  Fine for deterring casual abuse pre-launch; revisit if it's exploited.
- **No persisted generation history yet.** The pricing page intentionally
  only advertises what's implemented (unlimited generations). Saved
  history, tone presets restricted to Pro, and a generation queue are
  natural v2 additions — add the feature first, then add it to the pricing
  copy, not the other way around.
