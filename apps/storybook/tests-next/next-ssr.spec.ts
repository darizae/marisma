import { expect, test } from "@playwright/test";

test("interactive package components hydrate without runtime failures", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Next.js component fixture" }),
  ).toBeVisible();

  const input = page.getByRole("textbox", { name: "Library name" });
  await input.fill("Tidal UI");
  await page.getByRole("button", { name: "Confirm hydration" }).click();
  await expect(page.getByText("Hydrated Tidal UI")).toBeVisible();

  const trigger = page.getByRole("button", { name: "Open details" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Hydrated dialog" });
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  const checkbox = page.getByRole("checkbox", { name: "Hydrated checkbox" });
  await checkbox.click();
  await expect(checkbox).not.toBeChecked();
  const select = page.getByRole("combobox", { name: "Hydrated select" });
  await select.click();
  await page.getByRole("option", { name: "Tidal Blue" }).click();
  await expect(select).toContainText("Tidal Blue");
  await expect(
    page.getByRole("textbox", { name: "Hydrated date" }),
  ).toHaveValue("11 Nov 2026");
  const search = page.getByRole("searchbox", { name: "Hydrated search" });
  await search.fill("estuary");
  await page.getByRole("button", { name: "Search", exact: true }).click();
  await expect(page.getByText("Searching for estuary")).toBeVisible();
  expect(errors).toEqual([]);
});
