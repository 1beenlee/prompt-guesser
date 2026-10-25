# Prompt Guessor

An experimental, image-based prompt-guessing game built as a **static-first MVP**. Players inspect an illustration, choose from three prompt candidates, and reveal the original prompt. This is a prototype with a bounded sample puzzle set, **not** an indefinitely replenished live daily service.

## Implemented

- Next.js App Router with static export
- UTC-date-based puzzle lookup for the checked-in puzzle fixtures
- Three-choice A/B/C guessing, immediate feedback, and full prompt reveal
- Browser-local stats via `localStorage` (no user account or server-side storage)
- Copyable share text
- A **seven-day fixture set, March 2–8, 2026**, with corresponding puzzle metadata and illustrative SVG assets
- Playwright E2E test setup

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Static build and deployment preflight

```bash
npm run build
npm run verify:cloudflare
```

The app uses `output: "export"`; generated files are under `out/`. The Cloudflare Pages runbook describes the *intended configuration* and past troubleshooting, not independently verified current public availability:

[Cloudflare Pages runbook](docs/cloudflare_pages_runbook.md)

## Data and project structure

- `public/puzzles/daily/YYYY-MM-DD.json` — puzzle metadata and answer
- `public/puzzles/assets/` — sample assets
- `src/app/` and `src/components/` — app and game interaction
- `docs/` — product, design and operational notes

Example fixture: [March 2, 2026](public/puzzles/daily/2026-03-02.json)

## Remaining work / limitations

- Extend beyond the seven checked-in fixture days with a real publishing workflow before describing the product as a continuously updated daily game.
- Verify streak behavior around missed days and edge cases.
- Define privacy-respecting analytics for the answer/share funnel if there is a need to measure it.
- Independently verify the target deployment and its access before linking a live service.

**Project status:** MVP / experiment. The demo does not claim production adoption or measured user outcomes.
