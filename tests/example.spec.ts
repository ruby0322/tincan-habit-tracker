import { expect, test } from "@playwright/test";

test("1. Redirect Unauthenticated User to Login Page", async ({ page }) => {
  await page.goto("/manage");
  await expect(page).toHaveURL("/login");
});
