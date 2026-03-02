# Cloudflare Pages Runbook

## Purpose
Recover and operate Prompt Guessor deployment on Cloudflare Pages with deterministic settings.

## Root Cause (2026-03-02)
- Failed command on Pages: `npx wrangler deploy`
- Error: `Could not detect a directory containing static files`
- Why: Pages Git build expected a static output directory but was configured with a Worker deploy command.

## Fixed Pages Settings
Use these values in Cloudflare Pages project settings:

- Repository: `https://github.com/1beenlee/prompt-guesser`
- Branch: `main`
- Framework preset: `None` (or Next.js with static export behavior verified)
- Build command: `npm ci && npm run build`
- Build output directory: `out`
- Node.js version environment variable: `NODE_VERSION=20`

### Root Directory Rule
- If app is at repository root: `/`
- If app is inside monorepo folder: `Project/prompt-guessr`

## Pre-Deploy Checklist
1. `package-lock.json` is committed.
2. `npm run verify:cloudflare` passes.
3. `out/index.html` exists after build.
4. Pages branch is `main`.

## Validation Steps After Deploy
1. Preview deploy status is `Success`.
2. Home page renders.
3. Puzzle image and choices are visible.
4. Choosing an answer shows result and full prompt disclosure.
5. LocalStorage keeps same-day result on reload.

## Troubleshooting
### Warning: `No lock file has been detected`
- Root directory is likely wrong. Point Pages root to folder containing `package-lock.json`.

### Error: `Cannot find package.json`
- Pages root does not match app directory.

### Error: `Output directory out not found`
- Build command mismatch or branch does not include `next.config.ts` (`output: "export"`).

## Change Policy
- Do not use `npx wrangler deploy` as Pages build command.
- Keep build interface stable unless migration is explicitly planned.
