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

test("IT-FORMS-01: native form validation, submission, and reset preserve accessible relationships", async ({
  page,
}) => {
  await page.goto(
    "/iframe.html?id=forms-form-foundation--manual&viewMode=story",
  );

  const projectName = page.getByRole("textbox", { name: "Project name" });
  await page.getByRole("button", { name: "Submit" }).click();
  const summary = page.getByRole("alert", {
    name: "Please fix the following",
  });
  await expect(summary).toBeVisible();
  await expect(projectName).toHaveAttribute("aria-invalid", "true");
  await summary.getByRole("link", { name: "Enter a project name." }).click();
  await expect(projectName).toBeFocused();

  await projectName.fill("Tidal observations");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Submitted Tidal observations")).toBeVisible();
  await page.getByRole("button", { name: "Reset" }).click();
  await expect(projectName).toHaveValue("");
  await expect(page.getByText("Reset to native defaults")).toBeVisible();
});

test("IT-FORMS-01: composed confirmation, inline edit, and search preserve keyboard and focus behavior", async ({
  page,
}) => {
  await page.goto(
    "/iframe.html?id=forms-confirmation-dialog--manual&viewMode=story",
  );
  const confirmationTrigger = page.getByRole("button", {
    name: "Remove station",
  });
  await confirmationTrigger.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "Remove station?" });
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(confirmationTrigger).toBeFocused();

  await page.goto("/iframe.html?id=forms-inline-edit--manual&viewMode=story");
  const edit = page.getByRole("button", { name: "Edit Station name" });
  await edit.click();
  const inlineInput = page.getByRole("textbox", { name: "Station name" });
  await inlineInput.fill("Temporary draft");
  await page.keyboard.press("Escape");
  await expect(page.getByText("North bank")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Edit Station name" }),
  ).toBeFocused();

  await page.goto("/iframe.html?id=forms-search-field--manual&viewMode=story");
  const search = page.getByRole("searchbox", { name: "Search stations" });
  await search.fill(" reeds ");
  await page.keyboard.press("Enter");
  await expect(page.getByText("Searching for reeds")).toBeVisible();
  await page.getByRole("button", { name: "Clear search" }).click();
  await expect(search).toHaveValue("");
  await expect(search).toBeFocused();
});

test("IT-FORMS-01: Dropzone supports native input, drag rejection, clearing, and keyboard access", async ({
  page,
}) => {
  await page.goto("/iframe.html?id=forms-dropzone--manual&viewMode=story");
  const input = page.getByLabel("Choose evidence files");
  await input.focus();
  await expect(input).toBeFocused();
  await input.setInputFiles({
    buffer: Buffer.from("image"),
    mimeType: "image/png",
    name: "marsh.png",
  });
  await expect(page.getByText("marsh.png")).toBeVisible();

  const surface = page.getByTestId("dropzone-surface");
  await surface.evaluate((element) => {
    const transfer = new DataTransfer();
    transfer.items.add(
      new File(["notes"], "notes.txt", { type: "text/plain" }),
    );
    element.dispatchEvent(
      new DragEvent("dragenter", {
        bubbles: true,
        cancelable: true,
        dataTransfer: transfer,
      }),
    );
  });
  await expect(page.getByText("Drop files here")).toBeVisible();
  await surface.evaluate((element) => {
    const transfer = new DataTransfer();
    transfer.items.add(
      new File(["notes"], "notes.txt", { type: "text/plain" }),
    );
    element.dispatchEvent(
      new DragEvent("drop", {
        bubbles: true,
        cancelable: true,
        dataTransfer: transfer,
      }),
    );
  });
  await expect(page.getByRole("alert")).toContainText(
    "notes.txt is not an accepted file type",
  );

  await page.getByRole("button", { name: "Clear files" }).click();
  await expect(page.getByText("marsh.png")).toHaveCount(0);
  await expect(input).toHaveValue("");
});

test("IT-COMPOSITION-01: semantic data displays preserve states and keyboard overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(
    "/iframe.html?id=data-display-table--semantic-and-scrollable&viewMode=story",
  );
  const table = page.getByRole("table", { name: "Tide stations" });
  const region = page.getByRole("region", { name: "Tide station records" });
  await expect(table).toBeVisible();
  await expect(
    page.getByRole("columnheader", { name: "Station" }),
  ).toHaveAttribute("scope", "col");
  await expect(
    page.getByRole("rowheader", { name: "North bank observation platform" }),
  ).toHaveAttribute("scope", "row");
  await region.focus();
  await expect(region).toBeFocused();
  await expect
    .poll(() => region.evaluate((node) => node.scrollWidth - node.clientWidth))
    .toBeGreaterThan(0);
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowRight");
  await expect
    .poll(() => region.evaluate((node) => node.scrollLeft))
    .toBeGreaterThan(0);

  await page.goto(
    "/iframe.html?id=data-display-recordlist--loading&viewMode=story",
  );
  await expect(page.getByRole("status")).toContainText("Loading records");
  await page.goto(
    "/iframe.html?id=data-display-recordlist--error&viewMode=story",
  );
  await expect(page.getByRole("alert")).toContainText(
    "Station records could not be loaded",
  );
  await page.goto(
    "/iframe.html?id=data-display-recordlist--large-record-count&viewMode=story",
  );
  await expect(page.getByRole("listitem")).toHaveCount(150);
});

test("IT-COMPOSITION-01: mobile sidebar contains focus, dismisses, and preserves theme", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(
    "/iframe.html?id=compositions-application-page--tidal-blue-dark&viewMode=story",
  );
  const trigger = page.getByRole("button", { name: "Menu", exact: true });
  await expect(trigger).toBeVisible();
  await trigger.click();

  const sidebar = page.getByRole("dialog", { name: "Monitoring workspace" });
  await expect(sidebar).toBeVisible();
  await expect(page.locator('[data-marisma-portal="sidebar"]')).toHaveAttribute(
    "data-marisma-accent",
    "tidal-blue",
  );
  await expect(page.locator('[data-marisma-portal="sidebar"]')).toHaveAttribute(
    "data-marisma-mode",
    "dark",
  );
  await expect(
    page.getByRole("link", { name: "Overview" }).last(),
  ).toHaveAttribute("aria-current", "page");

  for (let index = 0; index < 6; index += 1) {
    await page.keyboard.press("Tab");
    await expect
      .poll(() =>
        sidebar.evaluate((element) => element.contains(document.activeElement)),
      )
      .toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(sidebar).toBeHidden();
  await expect(trigger).toBeFocused();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(390);
});

test("IT-COMPOSITION-01: integrated application landmarks and page patterns interoperate", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(
    "/iframe.html?id=compositions-application-page--reedwater-light&viewMode=story",
  );

  await expect(page.getByRole("main")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toHaveAttribute("href", "#marisma-main-content");
  await expect(
    page.getByRole("navigation", { name: "Workspace" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 1, name: "Estuary overview" }),
  ).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "Station onboarding" }),
  ).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();
  await expect(
    page.getByRole("table", { name: "Station states" }),
  ).toBeVisible();

  await page
    .getByRole("button", { name: "Open user menu for Ada Lovelace" })
    .click();
  await expect(page.getByRole("menuitem", { name: "Profile" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Open user menu for Ada Lovelace" }),
  ).toBeFocused();
});

test("selection controls expose keyboard, disabled, read-only, and error states", async ({
  page,
}) => {
  await page.goto(
    "/iframe.html?id=components-checkbox--tidal-blue-dark&viewMode=story",
  );
  const checkbox = page.getByRole("checkbox", {
    name: "Include archived records",
  });
  await checkbox.focus();
  await page.keyboard.press("Space");
  await expect(checkbox).not.toBeChecked();

  await page.goto(
    "/iframe.html?id=components-switch--tidal-blue-dark&viewMode=story",
  );
  const switchControl = page.getByRole("switch", { name: "Tide alerts" });
  await switchControl.focus();
  await page.keyboard.press("Space");
  await expect(switchControl).not.toBeChecked();

  await page.goto(
    "/iframe.html?id=components-radio-group--tidal-blue-dark&viewMode=story",
  );
  const firstRadio = page.getByRole("radio", { name: "Reedwater" });
  await firstRadio.focus();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("radio", { name: "Tidal Blue" })).toBeChecked();
  await expect(
    page.getByRole("radio", { name: "Archive gray" }),
  ).toBeDisabled();

  await page.goto(
    "/iframe.html?id=components-textarea--ownership-and-errors&viewMode=story",
  );
  const invalid = page.getByRole("textbox", { name: "Invalid note" });
  await expect(invalid).toHaveAttribute("aria-invalid", "true");
  await expect(invalid).toHaveAccessibleDescription("A note is required.");
  await expect(
    page.getByRole("textbox", { name: "Published note" }),
  ).toHaveAttribute("readonly");
});

test("toggle groups and collapsibles use roving focus and disclosure semantics", async ({
  page,
}) => {
  await page.goto(
    "/iframe.html?id=components-toggle-group--tidal-blue-dark&viewMode=story",
  );
  const bold = page.getByRole("button", { name: "Bold" });
  await bold.focus();
  await page.keyboard.press("ArrowRight");
  const italic = page.getByRole("button", { name: "Italic" });
  await expect(italic).toBeFocused();
  await page.keyboard.press("Space");
  await expect(italic).toHaveAttribute("data-state", "on");

  await page.goto(
    "/iframe.html?id=components-collapsible--tidal-blue-dark&viewMode=story",
  );
  const trigger = page.getByRole("button", { name: "Station details" });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByText(/Last sampled today/)).toBeVisible();
  await expect(trigger).toBeFocused();
});

test("Popover dismisses outside and with Escape, restores focus, and bridges subtree theme", async ({
  page,
}) => {
  await page.goto(
    "/iframe.html?id=components-popover--subtree-theme-portal&viewMode=story",
  );
  const trigger = page.getByRole("button", { name: "Open filters" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Record filters" });
  const portal = page.locator('[data-marisma-portal="popover"]');
  await expect(dialog).toBeVisible();
  await expect(portal).toHaveAttribute("data-marisma-accent", "tidal-blue");
  await expect(portal).toHaveAttribute("data-marisma-mode", "dark");
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();

  await trigger.click();
  const outsideBox = await page
    .getByRole("button", { name: "Outside target" })
    .boundingBox();
  expect(outsideBox).not.toBeNull();
  await page.mouse.click(
    outsideBox!.x + outsideBox!.width / 2,
    outsideBox!.y + outsideBox!.height / 2,
  );
  await expect(dialog).toBeHidden();
});

test("Tooltip opens on focus, contains no focusable content, and closes with Escape", async ({
  page,
}) => {
  await page.goto(
    "/iframe.html?id=components-tooltip--tidal-blue-dark&viewMode=story",
  );
  const trigger = page.getByRole("button", { name: "Station help" });
  await trigger.focus();
  const tooltip = page.getByRole("tooltip");
  await expect(tooltip).toContainText("Uses the nearest active station");
  await expect(
    page.locator('[data-marisma-portal="tooltip"]:has([role="tooltip"])'),
  ).toHaveAttribute("data-marisma-mode", "dark");
  await expect(
    tooltip.locator("button, a, input, select, textarea"),
  ).toHaveCount(0);
  await page.keyboard.press("Escape");
  await expect(tooltip).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("Dropdown Menu supports submenus, destructive styling, viewport collision, and focus return", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 280 });
  await page.goto(
    "/iframe.html?id=components-dropdown-menu--tidal-blue-dark&viewMode=story",
  );
  const trigger = page.getByRole("button", { name: "Record actions" });
  await expect(trigger).toHaveCSS("min-height", "44px");
  await trigger.focus();
  await page.keyboard.press("Enter");
  const menu = page.getByRole("menu", { name: "Record actions" });
  await expect(menu).toBeVisible();
  await expect(
    page.locator('[data-marisma-portal="dropdown-menu"]:has([role="menu"])'),
  ).toHaveAttribute("data-marisma-mode", "dark");
  await expect(
    page.getByRole("menuitem", { name: "Delete record" }),
  ).toHaveClass(/text-mar-danger/);
  const menuBox = await menu.boundingBox();
  expect(menuBox).not.toBeNull();
  expect(menuBox!.y + menuBox!.height).toBeLessThanOrEqual(280);
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();

  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto(
    "/iframe.html?id=components-dropdown-menu--tidal-blue-dark&viewMode=story",
  );
  const wideTrigger = page.getByRole("button", { name: "Record actions" });
  await wideTrigger.click();
  const moveTo = page.getByRole("menuitem", { name: "Move to" });
  await moveTo.press("ArrowRight");
  await expect(page.getByRole("menu", { name: "Move to" })).toBeVisible();
  await page.keyboard.press("Escape");
  await page.keyboard.press("Escape");
  await expect(wideTrigger).toBeFocused();
});

test("Tabs maintain tab/tabpanel relationships and skip disabled tabs", async ({
  page,
}) => {
  await page.goto(
    "/iframe.html?id=components-tabs--tidal-blue-dark&viewMode=story",
  );
  const overview = page.getByRole("tab", { name: "Overview" });
  await overview.focus();
  await page.keyboard.press("ArrowRight");
  const history = page.getByRole("tab", { name: "History" });
  await expect(history).toBeFocused();
  await expect(history).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel", { name: "History" })).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(overview).toBeFocused();
});

test("Select is single-value, skips disabled options, dismisses, and restores focus", async ({
  page,
}) => {
  await page.goto(
    "/iframe.html?id=components-select--tidal-blue-dark&viewMode=story",
  );
  const trigger = page.getByRole("combobox", {
    exact: true,
    name: "Controlled accent",
  });
  await trigger.focus();
  await page.keyboard.press("Enter");
  const disabledOption = page.getByRole("option", { name: "Archive gray" });
  await expect(disabledOption).toHaveAttribute("data-disabled");
  await expect(
    page.locator('[data-marisma-portal="select"]:has([role="listbox"])'),
  ).toHaveAttribute("data-marisma-mode", "dark");
  await page.keyboard.press("t");
  await expect(page.getByRole("option", { name: "Tidal Blue" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(trigger).toContainText("Tidal Blue");
  await expect(trigger).toBeFocused();
  await expect(
    page.getByRole("combobox", { exact: true, name: "Read-only accent" }),
  ).toHaveAttribute("aria-readonly", "true");
});

test("Calendar enforces disabled dates and performs APG date-grid navigation", async ({
  page,
}) => {
  await page.goto(
    "/iframe.html?id=components-calendar--tidal-blue-dark&viewMode=story",
  );
  const selected = page.getByRole("button", {
    name: "Wednesday, 11 November 2026, selected",
  });
  await selected.focus();
  await page.keyboard.press("ArrowRight");
  const disabledDay = page.getByRole("button", {
    name: "Thursday, 12 November 2026",
  });
  await expect(disabledDay).toBeFocused();
  await expect(disabledDay).toHaveAttribute("aria-disabled", "true");
  await page.keyboard.press("Enter");
  await expect(selected).toHaveAttribute("aria-label", /selected/);
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("button", {
      name: "Friday, 13 November 2026, selected",
    }),
  ).toBeVisible();
  await expect(
    page.getByText("Selected Friday, 13 November 2026"),
  ).toBeAttached();
  await page.keyboard.press("PageDown");
  await expect(page.getByRole("grid", { name: "December 2026" })).toBeVisible();
});

test("DateField focuses its selected day, formats and submits ISO, then restores focus", async ({
  page,
}) => {
  await page.goto(
    "/iframe.html?id=components-date-field--tidal-blue-dark&viewMode=story",
  );
  const input = page.getByRole("textbox", {
    name: "Controlled observation date",
  });
  await expect(input).toHaveValue("11 Nov 2026");
  const trigger = page.getByRole("button", {
    name: "Change date, Wednesday, 11 November 2026",
  });
  await trigger.click();
  const selectedDay = page.getByRole("button", {
    name: "Wednesday, 11 November 2026, selected",
  });
  await expect(selectedDay).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("Enter");
  await expect(input).toHaveValue("13 Nov 2026");
  await expect(
    page.getByRole("button", {
      name: "Change date, Friday, 13 November 2026",
    }),
  ).toBeFocused();
  await expect(page.locator('input[name="observationDate"]')).toHaveValue(
    "2026-11-13",
  );
});

test("all interaction families render without horizontal overflow in four themes", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(
    "/iframe.html?id=foundations-interaction-themes--all-widgets&viewMode=story",
  );
  const samples = page.locator(".interaction-theme-sample");
  await expect(samples).toHaveCount(4);
  for (const sample of await samples.all()) {
    await expect(sample.getByRole("checkbox")).toHaveCount(1);
    await expect(sample.getByRole("switch")).toHaveCount(1);
    await expect(sample.getByRole("radiogroup")).toHaveCount(2);
    await expect(sample.getByRole("tablist")).toHaveCount(1);
    await expect(sample.getByRole("combobox")).toHaveCount(1);
    await expect(sample.getByRole("grid")).toHaveCount(1);
  }
  const themeSignatures = await samples.evaluateAll((nodes) =>
    nodes.map((node) => {
      const style = getComputedStyle(node);
      return `${style.backgroundColor}|${style.color}|${style.colorScheme}`;
    }),
  );
  expect(new Set(themeSignatures).size).toBe(4);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(390);
});

test("interaction motion collapses to the reduced-motion duration", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(
    "/iframe.html?id=components-popover--subtree-theme-portal&viewMode=story",
  );
  await page.getByRole("button", { name: "Open filters" }).click();
  const duration = await page
    .getByRole("dialog", { name: "Record filters" })
    .evaluate((element) => getComputedStyle(element).transitionDuration);
  expect(Number.parseFloat(duration)).toBeLessThanOrEqual(0.001);
});
