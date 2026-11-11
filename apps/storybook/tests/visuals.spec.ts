import { expect, test } from "@playwright/test";

test("Reedwater light documentation example matches its desktop baseline", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(
    "/iframe.html?id=documentation-getting-started--default&viewMode=story",
  );
  await expect(page.locator("#storybook-root")).toHaveScreenshot(
    "documentation-reedwater-light-desktop.png",
    { animations: "disabled" },
  );
});

test("Tidal Blue dark documentation example matches its mobile baseline", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(
    "/iframe.html?id=documentation-getting-started--tidal-blue-dark&viewMode=story",
  );
  await expect(page.locator("#storybook-root")).toHaveScreenshot(
    "documentation-tidal-blue-dark-mobile.png",
    { animations: "disabled" },
  );
});

test("Reedwater application composition matches its desktop baseline", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(
    "/iframe.html?id=compositions-application-page--reedwater-light&viewMode=story",
  );
  await expect(page.locator("#storybook-root")).toHaveScreenshot(
    "application-composition-reedwater-light-desktop.png",
    { animations: "disabled" },
  );
});

test("Tidal Blue application composition matches its mobile baseline", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(
    "/iframe.html?id=compositions-application-page--tidal-blue-dark&viewMode=story",
  );
  await expect(page.locator("#storybook-root")).toHaveScreenshot(
    "application-composition-tidal-blue-dark-mobile.png",
    { animations: "disabled" },
  );
});
