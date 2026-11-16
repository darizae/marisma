import { chromium } from "@playwright/test";
import { readFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

// Run from apps/storybook against a locally running, compiled Storybook.
// Generated files are React/Storybook browser screenshots, never prototype renders.
// This script does not approve or overwrite Playwright snapshot baselines.
const root = resolve(process.cwd(), "../../docs/visuals/soft-elevation");
const storybook = process.env.MARISMA_STORYBOOK_URL ?? "http://127.0.0.1:6006";
const landing = process.env.MARISMA_LANDING_URL;
await mkdir(root, { recursive: true });
const browser = await chromium.launch();

const shots = [
  ["application-reedwater-light", "compositions-application-page--reedwater-light", 1440, 900],
  ["application-reedwater-dark", "compositions-application-page--reedwater-dark", 1440, 900],
  ["application-tidal-blue-light", "compositions-application-page--tidal-blue-light", 1440, 900],
  ["application-tidal-blue-dark", "compositions-application-page--tidal-blue-dark", 1440, 900],
  ["application-mobile", "compositions-application-page--tidal-blue-dark", 390, 844],
  ["components", "foundations-four-themes--status-tokens", 1200, 900],
  ["forms", "forms-form-foundation--manual", 1200, 900],
  ["inputs", "components-input--ownership-and-errors", 1200, 900],
  ["thumbnail-application", "compositions-application-page--reedwater-light", 800, 500],
];

try {
  for (const [name, storyId, width, height] of shots) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    try {
      const response = await page.goto(
        `${storybook}/iframe.html?id=${storyId}&viewMode=story`,
        { waitUntil: "domcontentloaded" },
      );
      if (!response?.ok()) throw new Error(`${name}: Storybook HTTP ${response?.status()}`);
      await page.locator("#storybook-root").waitFor({ state: "visible" });
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path: resolve(root, `${name}.jpg`),
        type: "jpeg",
        quality: 88,
        animations: "disabled",
      });
      console.log(`Captured ${name} from ${storyId} (${width}x${height})`);
    } finally {
      await page.close();
    }
  }

  if (landing) {
    const page = await browser.newPage({
      viewport: { width: 1200, height: 630 },
      deviceScaleFactor: 1,
    });
    try {
      const response = await page.goto(landing, { waitUntil: "domcontentloaded" });
      if (!response?.ok()) throw new Error(`Landing HTTP ${response?.status()}`);
      await page.locator("main").waitFor({ state: "visible" });
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path: resolve(root, "social-preview.jpg"),
        type: "jpeg",
        quality: 90,
        animations: "disabled",
      });
    } finally {
      await page.close();
    }
  } else {
    console.log("Social preview not captured: MARISMA_LANDING_URL not provided");
  }

  // Original screen is the previously committed 0.1.0 Playwright capture.
  // This comparison is deliberately derived from two genuine React renders.
  const baseline = resolve(
    process.cwd(),
    "tests/visuals.spec.ts-snapshots/application-composition-reedwater-light-desktop-chromium-darwin.png",
  );
  const original = (await readFile(baseline)).toString("base64");
  const updated = (await readFile(resolve(root, "application-reedwater-light.jpg"))).toString("base64");
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  try {
    await page.setContent(`<!doctype html><html><head><style>
      *{box-sizing:border-box}body{margin:0;padding:22px;background:#f7f6f1;color:#233331;font:600 17px system-ui}
      main{display:grid;grid-template-columns:1fr 1fr;gap:16px}
      section{min-width:0}h2{font-size:17px;margin:0 0 12px}img{display:block;width:100%;height:auto;border-radius:12px}
    </style></head><body><main>
      <section><h2>Marisma 0.1.0 · original</h2><img alt="Original Marisma app" src="data:image/png;base64,${original}"></section>
      <section><h2>Marisma 0.2.0 candidate · Soft Elevation</h2><img alt="Soft Elevation Marisma app" src="data:image/jpeg;base64,${updated}"></section>
    </main></body></html>`);
    await page.screenshot({
      path: resolve(root, "before-after.jpg"),
      type: "jpeg",
      quality: 88,
      animations: "disabled",
    });
  } finally {
    await page.close();
  }
} finally {
  await browser.close();
}
