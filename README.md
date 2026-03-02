# Prompt Guessor

Daily image-based prompt guessing service (v1 MVP).

## Implemented MVP
- Next.js static-first app (`src/app`, App Router)
- Daily puzzle loading by UTC date
- 3-choice answer flow (A/B/C)
- Immediate result and full prompt reveal
- Local stats persistence (LocalStorage)
- Share text copy (`PromptGuessr #YYYY-MM-DD ✅/❌`)

## Run
```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build (Static Export)
```bash
npm run build
```

For Cloudflare preflight:
```bash
npm run verify:cloudflare
```

## Data Structure
- `public/puzzles/daily/YYYY-MM-DD.json`: puzzle metadata and answer
- `public/puzzles/assets/*`: puzzle image assets
- `docs/`: product/design/ops reference docs

## Current Sample
- `public/puzzles/daily/2026-03-02.json`
- `public/puzzles/assets/2026-03-02.svg`

## Next Work
1. Add real image assets and at least 7 daily puzzles.
2. Add missed-day-aware streak policy and tests.
3. Add analytics events for share/correctness funnel.

## Cloudflare Pages Settings
- Repository: `https://github.com/1beenlee/prompt-guesser`
- Branch: `main`
- Build command: `npm ci && npm run build`
- Build output directory: `out`
- Node version: `20` (`NODE_VERSION=20`)
- Root directory:
  - app in repo root: `/`
  - app in monorepo subfolder: `Project/prompt-guessr`

See runbook: `docs/cloudflare_pages_runbook.md`
