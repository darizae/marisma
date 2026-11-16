import { expect, test } from "@playwright/test";

const themes = [
  ["reedwater", "light", "reedwater-light"],
  ["reedwater", "dark", "reedwater-dark"],
  ["tidal-blue", "light", "tidal-blue-light"],
  ["tidal-blue", "dark", "tidal-blue-dark"],
] as const;

for (const [accent, mode, story] of themes) {
  test(`Soft Elevation surfaces and navbar resolve for ${accent} ${mode}`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`/iframe.html?id=compositions-application-page--${story}&viewMode=story`);
    await expect(page.locator("html")).toHaveAttribute("data-marisma-accent", accent);
    await expect(page.locator("html")).toHaveAttribute("data-marisma-mode", mode);

    const card = page.locator("section.shadow-mar-card").first();
    await expect(card).toBeVisible();
    const cardStyle = await card.evaluate((element) => {
      const style = getComputedStyle(element);
      return { radius: style.borderTopLeftRadius, shadow: style.boxShadow };
    });
    expect(cardStyle.radius).toBe("18px");
    expect(cardStyle.shadow).not.toBe("none");

    const navbar = page.locator("header.rounded-mar-navbar").first();
    await expect(navbar).toBeVisible();
    await expect(navbar).toHaveCSS("border-top-left-radius", "13px");
  });
}

test("input boundaries and keyboard focus remain perceptible", async ({ page }) => {
  await page.goto("/iframe.html?id=documentation-getting-started--default&viewMode=story");
  const input = page.getByRole("textbox", { name: "Project name" });
  await expect(input).toBeVisible();
  const border = await input.evaluate((element) => getComputedStyle(element).borderTopColor);
  expect(border).not.toBe("rgba(0, 0, 0, 0)");
  await page.keyboard.press("Tab");
  await expect(input).toBeFocused();
  await expect(input).toHaveCSS("outline-width", "2px");
});

test("mobile application keeps content within the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/iframe.html?id=compositions-application-page--tidal-blue-dark&viewMode=story");
  await expect(page.getByRole("heading", { name: "Estuary overview" })).toBeVisible();
  const width = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(width).toBeLessThanOrEqual(390);
});
