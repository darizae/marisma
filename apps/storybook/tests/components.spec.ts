import { expect, test } from "@playwright/test";

test("Button negative states remain inactive", async ({ page }) => {
  await page.goto("/iframe.html?id=components-button--behavior&viewMode=story");

  await expect(page.getByRole("button", { name: "Disabled" })).toBeDisabled();
  const loading = page.getByRole("button", { name: "Loading" });
  await expect(loading).toBeDisabled();
  await expect(loading).toHaveAttribute("aria-busy", "true");
});

test("Input exposes label, description, and error relationships", async ({
  page,
}) => {
  await page.goto(
    "/iframe.html?id=components-input--ownership-and-errors&viewMode=story",
  );

  const invalid = page.getByRole("textbox", { name: "Invalid value" });
  await expect(invalid).toHaveAttribute("aria-invalid", "true");
  await expect(invalid).toHaveAccessibleDescription(
    "Use a name other developers recognize. Project name is required.",
  );
});

test("Dialog contains focus, dismisses with Escape, and restores focus", async ({
  page,
}) => {
  await page.goto("/iframe.html?id=components-dialog--default&viewMode=story");
  const trigger = page.getByRole("button", { name: "Open profile" });
  await trigger.click();

  const dialog = page.getByRole("dialog", { name: "Edit profile" });
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAccessibleDescription(
    "Change the public name shown to your collaborators.",
  );

  for (let index = 0; index < 7; index += 1) {
    await page.keyboard.press("Tab");
    await expect
      .poll(() =>
        dialog.evaluate((element) => element.contains(document.activeElement)),
      )
      .toBe(true);
  }
  await page.keyboard.press("Shift+Tab");
  await expect
    .poll(() =>
      dialog.evaluate((element) => element.contains(document.activeElement)),
    )
    .toBe(true);

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("documented Button, Input, and Dialog example behaves as shown", async ({
  page,
}) => {
  await page.goto(
    "/iframe.html?id=documentation-getting-started--default&viewMode=story",
  );

  const input = page.getByRole("textbox", { name: "Project name" });
  await input.fill("Tidal workspace");
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByText("Saved Tidal workspace")).toBeVisible();

  const trigger = page.getByRole("button", { name: "Open details" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Project details" });
  await expect(dialog).toHaveAccessibleDescription(
    "Dialogs keep focus contained until they close.",
  );
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("story globals theme portalled Dialog content", async ({ page }) => {
  await page.goto(
    "/iframe.html?id=components-dialog--tidal-blue-dark&viewMode=story",
  );

  await expect(page.locator("html")).toHaveAttribute(
    "data-marisma-accent",
    "tidal-blue",
  );
  await expect(page.locator("html")).toHaveAttribute(
    "data-marisma-mode",
    "dark",
  );
  await page.getByRole("button", { name: "Open profile" }).click();
  await expect(
    page.getByRole("dialog", { name: "Edit profile" }),
  ).toBeVisible();
});

test("Dialog bridges a subtree theme into its portal", async ({ page }) => {
  await page.goto(
    "/iframe.html?id=components-dialog--subtree-theme-portal&viewMode=story",
  );
  await expect(page.locator("html")).toHaveAttribute(
    "data-marisma-accent",
    "reedwater",
  );
  await page.getByRole("button", { name: "Open profile" }).click();
  const portal = page.locator('[data-marisma-portal="dialog"]');
  await expect(portal).toHaveAttribute("data-marisma-accent", "tidal-blue");
  await expect(portal).toHaveAttribute("data-marisma-mode", "dark");
  await expect(page.getByRole("dialog", { name: "Edit profile" })).toHaveCSS(
    "color-scheme",
    "dark",
  );
});

test("Copy Code announces a real clipboard rejection", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: () => Promise.reject(new Error("denied")) },
    });
  });
  await page.goto(
    "/iframe.html?id=components-copy-code--clipboard-feedback&viewMode=story",
  );
  await page.getByRole("button", { name: "Copy code" }).click();
  await expect(page.getByRole("alert")).toContainText(
    "Select the code and copy it manually",
  );
  await expect(page.locator('pre[tabindex="0"]')).toHaveCount(1);
});

test("Scroll Area supports keyboard-native overflow", async ({ page }) => {
  await page.goto(
    "/iframe.html?id=components-scroll-area--native-overflow&viewMode=story",
  );
  const region = page.getByRole("region", { name: "Recent tide readings" });
  await region.focus();
  await expect(region).toBeFocused();
  await page.keyboard.press("PageDown");
  await expect
    .poll(() => region.evaluate((node) => node.scrollTop))
    .toBeGreaterThan(0);
});

test("Toast announces, limits its stack, and dismisses", async ({ page }) => {
  await page.goto(
    "/iframe.html?id=components-toast--announcement-and-dismissal&viewMode=story",
  );
  const trigger = page.getByRole("button", { name: "Show notification" });
  for (let index = 0; index < 4; index += 1) await trigger.click();
  await expect(page.getByRole("status")).toHaveCount(3);
  await expect(
    page.getByRole("region", { name: "Notifications" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Dismiss notification" })
    .first()
    .click();
  await expect(page.getByRole("status")).toHaveCount(2);
});

test("foundation feedback tokens render in all four themes", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto(
    "/iframe.html?id=foundations-four-themes--status-tokens&viewMode=story",
  );
  const samples = page.locator(".theme-sample");
  await expect(samples).toHaveCount(4);
  const colors = await samples.evaluateAll((nodes) =>
    nodes.map((node) => {
      const style = getComputedStyle(node);
      return `${style.backgroundColor}|${style.color}|${style.colorScheme}`;
    }),
  );
  expect(new Set(colors).size).toBe(4);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(360);
});

test("Spinner disables rotation for reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/iframe.html?id=components-spinner--sizes&viewMode=story");
  await expect(page.getByRole("status").first()).toHaveCSS(
    "animation-name",
    "none",
  );
});
