// Thumbnails for the theme picker on the home page: one screenshot of the
// nav + hero per theme, scaled to 480x300 and saved as
// public/home/themes/<id>.webp.
//
// Needs a running dev server and Playwright (local or global install):
//   npx nuxt dev --port 5231
//   node scripts/home-theme-thumbnails.mjs --base http://localhost:5231 brutalist cartoon
// With no theme ids it does all of them. PLAYWRIGHT_MODULE=/path/to/playwright
// picks a specific Playwright install.

import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "public/home/themes");
const VIEWPORT = { width: 1440, height: 900 };
const THUMB = { width: 480, height: 300 };
const QUALITY = 0.82;

const args = process.argv.slice(2);
let base = "http://localhost:8089";
const ids = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--base") {
    base = args[++i];
    continue;
  }
  ids.push(args[i]);
}

// Theme ids from the registry, so this list never drifts from it.
const registry = readFileSync(join(ROOT, "data/home-themes.ts"), "utf8");
const allIds = [...registry.match(/HOME_THEME_IDS = \[([^\]]+)\]/)[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
const unknown = ids.filter((id) => !allIds.includes(id));
if (unknown.length) {
  console.error(`Unknown theme id: ${unknown.join(", ")}. Known: ${allIds.join(", ")}`);
  process.exit(1);
}

const { chromium } = loadPlaywright();
const browser = await chromium.launch();

for (const id of ids.length ? ids : allIds) {
  const context = await browser.newContext({
    viewport: VIEWPORT,
    colorScheme: "light",
    // Holds the hero photo still (no teaser or glitch mid-shot).
    reducedMotion: "reduce",
  });
  await context.addCookies([{ name: "dh_lang", value: "en", url: base }]);
  const page = await context.newPage();
  await page.goto(`${base}/?theme=${id}`, { waitUntil: "networkidle" });
  // Dev-only overlays.
  await page.addStyleTag({
    content: "nuxt-devtools-frame, #nuxt-devtools-container, vite-error-overlay { display: none !important; }",
  });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);

  const theme = await page.getAttribute("[data-theme]", "data-theme");
  if (theme !== id) throw new Error(`Expected data-theme="${id}", got "${theme}"`);

  const png = await page.screenshot({ clip: { x: 0, y: 0, ...VIEWPORT } });
  // Scale down and encode as webp in the browser: no image library needed.
  const dataUrl = await page.evaluate(
    async ({ src, width, height, quality }) => {
      const image = new Image();
      image.src = src;
      await image.decode();
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(image, 0, 0, width, height);
      return canvas.toDataURL("image/webp", quality);
    },
    { src: `data:image/png;base64,${png.toString("base64")}`, ...THUMB, quality: QUALITY },
  );
  const file = join(OUT_DIR, `${id}.webp`);
  writeFileSync(file, Buffer.from(dataUrl.split(",")[1], "base64"));
  console.log(`${id}: ${file}`);
  await context.close();
}

await browser.close();

function loadPlaywright() {
  const require = createRequire(import.meta.url);
  const candidates = [process.env.PLAYWRIGHT_MODULE, "playwright"];
  try {
    candidates.push(join(execSync("npm root -g", { encoding: "utf8" }).trim(), "playwright"));
  } catch {
    // no global npm
  }
  for (const candidate of candidates.filter(Boolean)) {
    try {
      return require(candidate);
    } catch {
      // try the next one
    }
  }
  console.error("Playwright not found. Install it, or set PLAYWRIGHT_MODULE=/path/to/playwright.");
  process.exit(1);
}
