import { expect, test } from "@playwright/test";

test("puzzle renders and user can solve/share", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (value: string) => {
          (window as Window & { __copied?: string }).__copied = value;
        }
      }
    });
  });

  await page.goto("/");

  await expect(page.locator(".puzzle-image")).toBeVisible();
  await expect(page.locator(".choice")).toHaveCount(3);

  await page.locator(".choice").first().click();
  await expect(page.locator(".result")).toBeVisible();

  await page.locator("details summary").click();
  await expect(page.locator(".prompt-text").first()).toBeVisible();

  await page.locator(".share-btn").click();
  const copied = await page.evaluate(
    () => (window as Window & { __copied?: string }).__copied
  );
  expect(copied).toContain("PromptGuessr #");
});

test("same-day state persists after reload", async ({ page }) => {
  await page.goto("/");
  await page.locator(".choice").nth(1).click();
  await expect(page.locator(".result")).toBeVisible();

  await page.reload();

  await expect(page.locator(".result")).toBeVisible();
  const stateText = await page.evaluate(() => window.render_game_to_text());
  expect(stateText).toContain("\"selectedKey\"");
  expect(stateText).not.toContain("\"selectedKey\":null");
});
