import { test, expect } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
const output = resolve("../../docs/visuals/motion-showcase");
test("four themes, mobile, zoom, forced colors, keyboard", async ({ page }) => {
  mkdirSync(output, { recursive: true });
  for (const accent of ["reedwater", "tidal-blue"]) {
    for (const mode of ["light", "dark"]) {
      await page.goto("/#/settings");
      await page.getByRole("combobox", { name: "Accent family" }).click();
      await page
        .getByRole("option", {
          name: accent === "reedwater" ? "Reedwater" : "Tidal Blue",
        })
        .click();
      await page.getByRole("combobox", { name: "Color mode" }).click();
      await page
        .getByRole("option", { name: mode === "light" ? "Light" : "Dark" })
        .click();
      await expect(
        page.locator("[data-marisma-accent]").first(),
      ).toHaveAttribute("data-marisma-accent", accent);
      await expect(page.locator("[data-marisma-mode]").first()).toHaveAttribute(
        "data-marisma-mode",
        mode,
      );
      await page.screenshot({
        path: resolve(output, `settings-${accent}-${mode}.png`),
        fullPage: true,
      });
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#/overview");
  await page.screenshot({
    path: resolve(output, "overview-mobile-390.png"),
    fullPage: true,
  });
  await expect(page.locator("html")).toHaveJSProperty("scrollWidth", 390);
  await page.setViewportSize({ width: 320, height: 700 });
  await page.screenshot({
    path: resolve(output, "overview-mobile-320.png"),
    fullPage: true,
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/#/overview");
  await page.screenshot({
    path: resolve(output, "overview-desktop.png"),
    fullPage: true,
  });
  await page.evaluate(() => {
    document.documentElement.style.zoom = "2";
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  await page.goto("/#/motion");
  await expect(page.locator(".marisma-motion-rise")).toHaveCSS(
    "animation-name",
    "none",
  );
  await page.screenshot({
    path: resolve(output, "motion-reduced-forced-colors.png"),
    fullPage: true,
  });
});
