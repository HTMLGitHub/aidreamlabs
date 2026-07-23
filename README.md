# AIDreamLabs Site

React/Vite landing page for AIDreamLabs.

## Current Phase

Phase 1 Sprint 1: React landing page foundation, first visual polish, responsive QA, and GitHub Pages deployment.

## Tech

- React
- TypeScript
- Vite
- CSS
- GitHub Pages
- GitHub Actions

## Project Structure

```txt
aidreamlab/
├─ index.html
├─ public/
│  └─ dazbog.png
├─ src/
│  ├─ App.tsx
│  ├─ App.css
│  ├─ index.css
│  └─ main.tsx
├─ package.json
└─ vite.config.ts
```

## Local Development

```bash
cd aidreamlab
npm install
npm run dev
```

## Production Build

```bash
cd aidreamlab
npm run build
```

## Founding Member Pre-Order

The landing page includes a paid "Founding Member" section (`$19` one-time deposit for
50% off at launch + priority access), backed by a Stripe Payment Link. To activate it:

1. In the [Stripe Dashboard](https://dashboard.stripe.com), create a one-time Product/Price for the offer.
2. Create a Payment Link for that price (Payment Links > New).
3. Replace `STRIPE_FOUNDING_MEMBER_LINK` in `aidreamlab/src/App.tsx` with your real Payment Link URL.

Until step 3 is done, the "Become a Founding Member" button points at a placeholder URL.

## Deployment

The site deploys through GitHub Actions using:

```txt
.github/workflows/deploy.yml
```

The workflow builds the Vite app inside `aidreamlab/` and deploys `aidreamlab/dist` to GitHub Pages.