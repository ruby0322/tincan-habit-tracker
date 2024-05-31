import { test, expect } from "@playwright/test";
import {
  TEST_USER1_EMAIL,
  TEST_USER1_PWD,
  TEST_USER2_EMAIL,
  TEST_USER2_PWD,
  login,
} from "./utils";

test.describe("post", () => {
  test("3-1. testuser1-create-post:", async ({ page }) => {
    await login(page, TEST_USER1_EMAIL, TEST_USER1_PWD);
    const habit_title = "拉筋";
    await page.getByRole("heading", { name: habit_title }).click();
    await page.getByRole("button", { name: "發文" }).first().click();
    await page.getByRole("button", { name: "我確定" }).click();
    await page.waitForURL("http://localhost:3000/social");
    await expect(page).toHaveURL("/social");
    await expect(page.getByText(habit_title)).toBeVisible();
  });

  test("3-2. testuser2-create-post:", async ({ page }) => {
    await login(page, TEST_USER2_EMAIL, TEST_USER2_PWD);
    const habit_title = "吃60g蛋白質";
    await page.getByRole("heading", { name: habit_title }).click();
    await page.getByRole("button", { name: "發文" }).first().click();
    await page.getByRole("button", { name: "我確定" }).click();
    await page.waitForURL("http://localhost:3000/social");
    await expect(page).toHaveURL("/social");
    await expect(page.getByText("蛋白質")).toBeVisible();
  });
});
