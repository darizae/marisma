import { expect, test } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const captures = resolve("../../docs/visuals/motion-showcase");

test("toolbar is center-aligned at desktop, tablet and narrow widths; favicon is real SVG", async ({
  page,
}) => {
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/#/forms");
    const centers = await page.evaluate(() => {
      const center = (selector: string) => {
        const element = document.querySelector(selector);
        if (!element) return null;
        const box = element.getBoundingClientRect();
        return { y: box.y + box.height / 2, height: box.height };
      };
      return {
        accent: center('header [role="combobox"]'),
        label: center("header label"),
        dark: center('header button[aria-label^="Switch to"]'),
        actions: center('header button[aria-label="Workspace actions"]'),
        overflow: document.documentElement.scrollWidth > innerWidth,
      };
    });
    expect(centers.overflow, `overflow at ${width}px`).toBe(false);
    expect(centers.dark?.height, `mode button height at ${width}px`).toBe(40);
    expect(
      Math.abs((centers.dark?.y ?? 0) - (centers.actions?.y ?? 0)),
    ).toBeLessThanOrEqual(1);
    if (width >= 640) {
      expect(
        Math.abs((centers.accent?.y ?? 0) - (centers.dark?.y ?? 0)),
      ).toBeLessThanOrEqual(1);
      expect(
        Math.abs((centers.label?.y ?? 0) - (centers.dark?.y ?? 0)),
      ).toBeLessThanOrEqual(1);
    }
    if (width === 1440) {
      mkdirSync(captures, { recursive: true });
      await page.screenshot({
        path: resolve(captures, "toolbar-aligned-desktop.png"),
        fullPage: true,
      });
    }
  }
  const faviconUrl = await page
    .locator('link[rel="icon"]')
    .getAttribute("href");
  expect(faviconUrl).toBeTruthy();
  if (faviconUrl!.startsWith("data:")) {
    const [metadata, payload] = faviconUrl!.split(",", 2);
    expect(metadata).toContain("image/svg+xml");
    expect(decodeURIComponent(payload)).toContain("<svg");
  } else {
    const response = await page.request.get(
      new URL(faviconUrl!, page.url()).href,
    );
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/svg+xml");
    expect(await response.text()).toContain("<svg");
  }
});

test("Input and Textarea have subtle focus feedback and a static reduced-motion fallback", async ({
  page,
}) => {
  await page.goto("/#/forms");
  const observer = page.getByRole("textbox", { name: "Observer name" });
  const notes = page.getByRole("textbox", { name: "Field notes" });
  await expect(observer).toHaveClass(/marisma-motion-field/);
  await expect(notes).toHaveClass(/marisma-motion-field/);
  const normalDuration = await observer.evaluate(
    (node) => getComputedStyle(node).transitionDuration,
  );
  expect(normalDuration).not.toBe("0s");
  await observer.focus();
  await expect(observer).toBeFocused();
  await expect
    .poll(() => observer.evaluate((node) => getComputedStyle(node).boxShadow))
    .not.toBe("none");
  mkdirSync(captures, { recursive: true });
  await page.screenshot({
    path: resolve(captures, "form-field-focus.png"),
    fullPage: true,
  });
  await notes.focus();
  await expect
    .poll(() => notes.evaluate((node) => getComputedStyle(node).boxShadow))
    .not.toBe("none");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(observer).toHaveCSS("transition-property", "none");
  await expect(notes).toHaveCSS("transition-property", "none");
});

test("notifications compact, stack, expand, support actions, and reduce motion", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/#/motion");
  await page.getByRole("button", { name: "Stack three toasts" }).click();
  const stack = page.getByRole("region", { name: "Notifications" });
  await expect(stack.locator("li")).toHaveCount(3);
  await expect(stack).toHaveAttribute("data-expanded", "false");
  await expect(stack.locator("li").first()).toContainText(
    "Observation archived",
  );
  await page.screenshot({
    path: resolve(captures, "toasts-collapsed.png"),
    fullPage: true,
  });
  await stack.locator("li").first().hover();
  await expect(stack).toHaveAttribute("data-expanded", "true");
  await expect(stack.getByRole("status")).toHaveCount(3);
  await page.screenshot({
    path: resolve(captures, "toasts-expanded.png"),
    fullPage: true,
  });
  await stack.getByRole("button", { name: "Undo" }).click();
  await expect(stack.locator("li")).toHaveCount(2);
  await stack
    .getByRole("button", { name: "Dismiss notification" })
    .first()
    .focus();
  await expect(stack).toHaveAttribute("data-expanded", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(stack.locator(".marisma-toast-surface").first()).toHaveCSS(
    "animation-name",
    "none",
  );
});

test("toast swipe dismisses without blocking other notifications", async ({
  page,
}) => {
  await page.goto("/#/motion");
  await page.getByRole("button", { name: "Stack three toasts" }).click();
  const stack = page.getByRole("region", { name: "Notifications" });
  await expect(stack.locator("li")).toHaveCount(3);
  const front = stack.locator("li").first();
  const box = await front.boundingBox();
  expect(box).not.toBeNull();
  const startX = box!.x + 70;
  const startY = box!.y + box!.height / 2;
  await page.mouse.move(startX, startY);
  await page.mouse.down();
  await page.mouse.move(startX + 110, startY, { steps: 7 });
  await page.mouse.up();
  await expect(stack.locator("li")).toHaveCount(2);
});

test("toast stack stays inside a narrow dark Tidal Blue viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#/settings");
  await page.getByRole("combobox", { name: "Accent family" }).click();
  await page.getByRole("option", { name: "Tidal Blue" }).click();
  await page.getByRole("combobox", { name: "Color mode" }).click();
  await page.getByRole("option", { name: "Dark" }).click();
  await page.goto("/#/motion");
  await page.getByRole("button", { name: "Stack three toasts" }).click();
  const stack = page.getByRole("region", { name: "Notifications" });
  await expect(stack.locator("li")).toHaveCount(3);
  const box = await stack.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(390);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    390,
  );
  await page.screenshot({
    path: resolve(captures, "toasts-tidal-blue-dark-mobile.png"),
    fullPage: true,
  });
});
