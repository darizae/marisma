import { test, expect } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

// Reproducible screenshots from the running app, not mockups or design comps.
const output = resolve("../../docs/visuals/showcase");
test("capture README desktop, interactions, theme and mobile", async ({ page }) => {
  mkdirSync(output, { recursive: true });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });

  for (const [route, name] of [
    ["overview", "overview-desktop"],
    ["forms", "forms-desktop"],
    ["data", "data-calendar-desktop"],
    ["explorer", "component-explorer-desktop"],
    ["motion", "motion-lab-desktop"],
  ] as const) {
    await page.goto(`/#/${route}`);
    await expect(page.getByRole("heading", { name: route === "explorer" ? "Component explorer" : route === "forms" ? "Forms & feedback" : route === "data" ? "Data & calendar" : route === "motion" ? "Motion lab" : "Overview" })).toBeVisible();
    await page.screenshot({ path: resolve(output, `${name}.png`), animations: "disabled", fullPage: true });
  }

  await page.goto("/#/settings");
  await page.getByRole("combobox", { name: "Accent family" }).click();
  await page.getByRole("option", { name: "Tidal Blue" }).click();
  await page.getByRole("combobox", { name: "Color mode" }).click();
  await page.getByRole("option", { name: "Dark" }).click();
  await page.goto("/#/overview");
  await expect(page.locator("[data-marisma-mode]").first()).toHaveAttribute("data-marisma-mode", "dark");
  await page.screenshot({ path: resolve(output, "overview-tidal-dark.png"), animations: "disabled", fullPage: true });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#/overview");
  await expect(page.getByRole("heading", { name: "Overview" })).toBeVisible();
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: resolve(output, "overview-mobile.png"), animations: "disabled", fullPage: true });
});
