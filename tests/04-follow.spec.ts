import { test, expect } from "@playwright/test";
import {
  TEST_USER1_EMAIL,
  TEST_USER1_PWD,
  TEST_USER2_EMAIL,
  TEST_USER2_PWD,
  login,
} from "./utils";

test("follow", async ({ page }) => {
  await login(page, TEST_USER1_EMAIL, TEST_USER1_PWD);
  await page.locator(".sm\\:w-\\[28rem\\] > div > a").first().click();
  await page.goto("http://localhost:3000/social");
  await expect(page).toHaveURL("/social");
  await page.getByRole("img", { name: "testuser2" }).click();
  await page.getByRole("button", { name: "追蹤" }).click({ timeout: 10000 });
  await expect(page.getByRole("button", { name: "追蹤中" })).toBeVisible();
  await page.locator(".text-gray-400").first().click();
  await page.waitForURL("http://localhost:3000/social");
  await expect(page).toHaveURL("/social");
  await page.reload();
  await page.getByRole("tab", { name: "追蹤" }).click();
  await expect(page.getByRole("heading", { name: "testuser2" })).toBeVisible();
});
