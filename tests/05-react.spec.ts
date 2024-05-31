import { test, expect } from "@playwright/test";
import { TEST_USER1_EMAIL, TEST_USER1_PWD, login } from "./utils";

test.describe("reaction", () => {
  test("react to post", async ({ page }) => {
    await login(page, TEST_USER1_EMAIL, TEST_USER1_PWD);
    await page.locator(".sm\\:w-\\[28rem\\] > div > a").first().click();
    await expect(page).toHaveURL("/social");
    await page.getByLabel("熱門").locator("svg").first().click();
    await page.locator("div:nth-child(2) > .lucide").click();
    await page
      .locator("div")
      .filter({ hasText: /^你按了這篇貼文表情$/ })
      .first()
      .click();
    await expect(page.getByRole("dialog")).toContainText("testuser1");
  });
});
