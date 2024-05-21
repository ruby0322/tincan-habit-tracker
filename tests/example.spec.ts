import { defineConfig, expect, test } from "@playwright/test";

export default defineConfig({
  expect: {
    timeout: 5000,
  },
});

test("1. Redirect Unauthenticated User to Login Page", async ({ page }) => {
  await page.goto("http://localhost:3000/manage");
  await expect(page).toHaveURL("http://localhost:3000/login");
});
