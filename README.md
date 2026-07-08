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

## Deployment

The site deploys through GitHub Actions using:

```txt
.github/workflows/deploy.yml
```

The workflow builds the Vite app inside `aidreamlab/` and deploys `aidreamlab/dist` to GitHub Pages.