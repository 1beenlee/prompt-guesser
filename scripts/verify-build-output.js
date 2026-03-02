const fs = require("node:fs");
const path = require("node:path");

const outDir = path.resolve(process.cwd(), "out");
const indexHtml = path.join(outDir, "index.html");

if (!fs.existsSync(outDir)) {
  console.error("[verify:cloudflare] Missing build output directory: out");
  process.exit(1);
}

if (!fs.existsSync(indexHtml)) {
  console.error("[verify:cloudflare] Missing entry file: out/index.html");
  process.exit(1);
}

console.log("[verify:cloudflare] Build output verified.");
