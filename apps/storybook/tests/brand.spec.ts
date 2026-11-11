import { expect, test } from "@playwright/test";

test("landing serves the canonical brand asset at a non-root base path", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page).toHaveTitle(
    "Marisma — React components for calm, capable interfaces",
  );
  await expect(
    page.getByRole("img", { name: "Marisma leaf brand mark" }),
  ).toHaveAttribute("src", "/marisma/marisma-leaf.svg");

  const favicon = page.locator('link[rel="icon"]');
  await expect(favicon).toHaveAttribute("href", "/marisma/marisma-leaf.svg");

  const assetResponse = await page.request.get("marisma-leaf.svg");
  expect(assetResponse.ok()).toBe(true);
  expect(assetResponse.headers()["content-type"]).toContain("image/svg+xml");
});
