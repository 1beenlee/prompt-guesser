# Prompt Guessr

Daily image-based prompt guessing game.

---

## What it is
Prompt Guessr is a Wordle-like daily game where players see an image result and guess which prompt produced it.

- **Daily puzzle** (global): switches at **UTC 00:00**
- **Simple Mode (v1.0)**: 3 prompt choices (A/B/C), instant result
- **Result screen includes the full prompt** (collapsible)
- **Spoiler-free sharing** (only win/lose, no proximity)
- **Personal stats** stored locally (LocalStorage)

---

## Key decisions (MVP)
- **Hosting**: Cloudflare Pages
- **Framework**: Next.js (static-first)
- **Data**: puzzles are **versioned in this repo** (JSON + image assets). No DB pre-revenue.
- **Analytics**: optional free analytics (e.g., GA). No paid services pre-revenue.
- **Project management**: Linear (single account), track ownership via an **Actor** label group.

---

## Repository structure
```text
docs/                 # Kick-off docs (product/design/engineering/ops)
puzzles/
  daily/              # Daily puzzle JSON files (YYYY-MM-DD.json)
  assets/             # Image assets referenced by puzzles (webp/avif/png)
scripts/              # Validation/build helper scripts (to be implemented)
src/                  # Next.js app source
public/               # Static public assets (if needed)
````

---

## Puzzle format (v1.0)

Each daily puzzle lives at: `puzzles/daily/YYYY-MM-DD.json`

Example:

```json
{
  "id": "2026-03-02",
  "publishAtUtc": "2026-03-02T00:00:00Z",
  "asset": {
    "type": "image",
    "path": "/puzzles/assets/2026-03-02.webp",
    "alt": "Daily prompt puzzle"
  },
  "mode": "simple",
  "choices": [
    { "key": "A", "promptShort": "Red origami crane, flat, cream bg, long 45° shadow" },
    { "key": "B", "promptShort": "Flat red bird icon on white" },
    { "key": "C", "promptShort": "Origami crane in red on beige, soft light" }
  ],
  "answer": {
    "choiceKey": "A",
    "fullPrompt": "flat red origami crane on cream background with a long 45-degree diagonal shadow, minimal poster style",
    "negativePrompt": "photorealistic, watercolor, gradients, 3d render, line-art",
    "recipe": {
      "modelFamily": "SDXL",
      "aspectRatio": "1:1",
      "size": "1024x1024",
      "seed": 123456
    }
  },
  "tags": ["origami", "minimal", "shadow"],
  "difficulty": 2
}
```

---

## Content rules (Simple Mode)

* Choices must be **short** (readable in 5–10 seconds)
* Wrong choices should still look plausible, but the correct choice includes **1–2 decisive details**
* Keep content safe: avoid logos, famous IP, real people, NSFW, violence/hate

See: `docs/06_content_ops.md` and `docs/07_safety_privacy_legal.md`

---

## Local development (once app code exists)

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
npm run start
```

> Cloudflare Pages will be connected to this GitHub repo for automatic previews and deploys.

---

## Deployment (Cloudflare Pages)

1. Create a Cloudflare Pages project
2. Connect this GitHub repo
3. Set:

   * **Build command**: `npm run build`
   * **Output directory**: depends on Next.js static export strategy (to be set during implementation)
4. Enable Preview Deployments

---

## Docs

Kick-off documents live in `/docs`:

* `01_product_spec.md`
* `02_design_strategy.md`
* `03_engineering_agent_team.md`
* `04_project_ops.md`
* `05_repo_bootstrap_checklist.md`
* `06_content_ops.md`
* `07_safety_privacy_legal.md`

---

## License

MIT — see `LICENSE`.

```
