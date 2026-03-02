# Repo Bootstrap Checklist (GitHub + Cloudflare Pages)

## 1) GitHub
- [ ] `https://github.com/1beenlee/prompt-guesser` main branch connected
- [ ] App directory is finalized (repo root or `Project/prompt-guessr`)
- [ ] `package-lock.json` committed
- [ ] `README` and deployment runbook committed

## 2) Cloudflare Pages
- [ ] Cloudflare Pages project linked to GitHub repository
- [ ] Branch: `main`
- [ ] Build command: `npm ci && npm run build`
- [ ] Build output directory: `out`
- [ ] Root directory set to app location (`/` or `Project/prompt-guessr`)
- [ ] `NODE_VERSION=20` environment variable configured
- [ ] Preview deployments ON
- [ ] `npx wrangler deploy` is not used as deploy command

## 3) CI
- [ ] GitHub Actions CI enabled (`.github/workflows/ci.yml`)
- [ ] `npm ci` + `npm run verify:cloudflare` passes on PR
- [ ] Build output check confirms `out/index.html`

## 4) Runtime Validation
- [ ] Preview URL loads the home page
- [ ] Puzzle image + 3 choices render
- [ ] Result + full prompt disclosure works after selection
- [ ] Reload keeps same-day result via LocalStorage

## 5) Analytics (follow-up)
- [ ] Event schema defined (`view_puzzle`, `pick_choice`, `view_result`, `copy_share`, `expand_prompt`)
- [ ] Tracking tool integration task created in Linear
