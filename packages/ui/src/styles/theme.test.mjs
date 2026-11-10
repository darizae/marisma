import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const css = readFileSync(new URL("./theme.css", import.meta.url), "utf8");

const themeSelectors = {
  "reedwater light":
    '[data-marisma-accent="reedwater"][data-marisma-mode="light"]',
  "reedwater dark":
    '[data-marisma-accent="reedwater"][data-marisma-mode="dark"]',
  "tidal-blue light":
    '[data-marisma-accent="tidal-blue"][data-marisma-mode="light"]',
  "tidal-blue dark":
    '[data-marisma-accent="tidal-blue"][data-marisma-mode="dark"]',
};

function declarationsFor(selector) {
  const selectorIndex = css.indexOf(selector);
  assert.notEqual(selectorIndex, -1, `missing theme selector: ${selector}`);

  const blockStart = css.indexOf("{", selectorIndex);
  const blockEnd = css.indexOf("}", blockStart);
  assert.notEqual(blockStart, -1, `missing declaration block for: ${selector}`);
  assert.notEqual(
    blockEnd,
    -1,
    `unterminated declaration block for: ${selector}`,
  );

  return Object.fromEntries(
    css
      .slice(blockStart + 1, blockEnd)
      .split(";")
      .map((declaration) => declaration.trim())
      .filter(Boolean)
      .map((declaration) => {
        const separator = declaration.indexOf(":");
        return [
          declaration.slice(0, separator).trim(),
          declaration.slice(separator + 1).trim(),
        ];
      }),
  );
}

function relativeLuminance(hex) {
  const channels = hex
    .slice(1)
    .match(/.{2}/g)
    .map((channel) => Number.parseInt(channel, 16) / 255)
    .map((channel) =>
      channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
    );

  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function contrast(foreground, background) {
  const lighter = Math.max(
    relativeLuminance(foreground),
    relativeLuminance(background),
  );
  const darker = Math.min(
    relativeLuminance(foreground),
    relativeLuminance(background),
  );
  return (lighter + 0.05) / (darker + 0.05);
}

test("exports semantic Tailwind utilities backed by theme variables", () => {
  assert.match(css, /@theme inline\s*{/);

  for (const token of [
    "surface",
    "card",
    "text",
    "muted",
    "border",
    "primary",
    "primary-hover",
    "on-primary",
    "focus",
  ]) {
    assert.match(
      css,
      new RegExp(`--color-mar-${token}: var\\(--marisma-${token}\\);`),
    );
  }

  assert.match(css, /--font-mar-sans: var\(--marisma-font-sans\);/);
  assert.match(css, /--text-mar-body: var\(--marisma-text-body\);/);
});

test("defines four explicit, locally scoped theme combinations with a Reedwater light default", () => {
  const palettes = Object.fromEntries(
    Object.entries(themeSelectors).map(([name, selector]) => [
      name,
      declarationsFor(selector),
    ]),
  );

  assert.match(css, /:root\s*{/);
  assert.match(
    css,
    /:root\[data-marisma-mode="dark"\]:not\(\[data-marisma-accent\]\)/,
  );
  assert.notDeepEqual(palettes["reedwater light"], palettes["reedwater dark"]);
  assert.notDeepEqual(
    palettes["reedwater light"],
    palettes["tidal-blue light"],
  );
  assert.notDeepEqual(
    palettes["tidal-blue light"],
    palettes["tidal-blue dark"],
  );
});

test("meets measured text, focus, and non-text contrast targets in every theme", async (t) => {
  const measurements = [
    ["text", "surface", 4.5],
    ["muted", "surface", 4.5],
    ["text", "card", 4.5],
    ["muted", "card", 4.5],
    ["on-primary", "primary", 4.5],
    ["on-primary", "primary-hover", 4.5],
    ["border", "surface", 3],
    ["border", "card", 3],
    ["primary", "surface", 3],
    ["primary", "card", 3],
    ["focus", "surface", 3],
    ["focus", "card", 3],
  ];

  for (const [name, selector] of Object.entries(themeSelectors)) {
    const palette = declarationsFor(selector);
    const results = [];

    for (const [foreground, background, target] of measurements) {
      const foregroundValue = palette[`--marisma-${foreground}`];
      const backgroundValue = palette[`--marisma-${background}`];
      assert.match(
        foregroundValue ?? "",
        /^#[0-9a-f]{6}$/i,
        `${name}: ${foreground} must be hex`,
      );
      assert.match(
        backgroundValue ?? "",
        /^#[0-9a-f]{6}$/i,
        `${name}: ${background} must be hex`,
      );

      const ratio = contrast(foregroundValue, backgroundValue);
      results.push(`${foreground}/${background} ${ratio.toFixed(2)}:1`);
      assert.ok(
        ratio >= target,
        `${name}: ${foreground} on ${background} is ${ratio.toFixed(2)}:1; expected ${target}:1`,
      );
    }

    await t.test(`${name}: ${results.join(", ")}`);
  }
});

test("defines visible focus, reduced-motion, and forced-colors behavior", () => {
  assert.match(css, /:focus-visible\s*{/);
  assert.match(
    css,
    /outline: var\(--marisma-focus-width\) solid var\(--marisma-focus\);/,
  );
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /--marisma-duration-fast: 0\.01ms;/);
  assert.match(css, /@media \(forced-colors: active\)/);
  assert.match(
    css,
    /@media \(forced-colors: active\)[\s\S]*\[data-marisma-accent\]\[data-marisma-mode\][\s\S]*--marisma-focus: Highlight;/,
  );
  assert.match(css, /--marisma-focus: Highlight;/);
});
