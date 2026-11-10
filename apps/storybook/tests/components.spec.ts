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
