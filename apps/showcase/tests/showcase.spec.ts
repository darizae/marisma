import { test, expect } from "@playwright/test";
test("navigation, catalog filtering and live data filter", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Overview" })).toBeVisible();
  await page.getByRole("link", { name: /Component explorer/ }).click();
  await expect(page.getByText("48 of 48 families")).toBeVisible();
  await page
    .getByRole("searchbox", { name: "Search component families" })
    .fill("calendar");
  await expect(page.getByText("1 of 48 families")).toBeVisible();
  await page.getByRole("link", { name: /Data & calendar/ }).click();
  await page.getByRole("button", { name: /Region: All regions/ }).click();
  await page.getByRole("button", { name: "South" }).click();
  await expect(page.getByText("2 results")).toBeVisible();
  await page.getByRole("button", { name: "Toggle error state" }).click();
  await expect(
    page.getByRole("alert", { name: undefined }).last(),
  ).toContainText("Simulated connection issue");
});
test("form validation, dialog dismissal and theme selection", async ({
  page,
}) => {
  await page.goto("/#/forms");
  const save = page.getByRole("button", { name: "Save sample observation" });
  await save.click();
  await expect(page.getByLabel("Observer name")).toHaveJSProperty(
    "validity.valueMissing",
    true,
  );
  await page.getByLabel("Observer name").fill("Demo Tester");
  await page.getByLabel("Contact email").fill("demo@example.test");
  await save.click();
  await expect(page.getByText("Sample form submitted")).toBeVisible();
  const open = page.getByRole("button", { name: "Open dialog" });
  await open.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(open).toBeFocused();
  await page.goto("/#/settings");
  await page.getByRole("combobox", { name: "Color mode" }).click();
  await page.getByRole("option", { name: "Dark" }).click();
  await expect(page.locator("[data-marisma-mode=dark]").first()).toBeVisible();
});
test("reduced motion and responsive layout", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/motion");
  await expect(page.locator(".marisma-motion-rise").first()).toHaveCSS(
    "animation-name",
    "none",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.getByRole("link", { name: /Settings/ })).toBeVisible();
  await page.getByRole("link", { name: /Settings/ }).click();
  await expect(page.getByRole("heading", { name: "Settings" })).toBeVisible();
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > innerWidth,
  );
  expect(overflow).toBe(false);
});
