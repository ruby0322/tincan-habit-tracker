import { test, expect, Page } from "@playwright/test";
import {
  TEST_USER1_EMAIL,
  TEST_USER1_PWD,
  TEST_USER2_EMAIL,
  TEST_USER2_PWD,
  login,
} from "./utils";

test.describe("habit", () => {
  test("2-1. testuser1-create-habit-1:", async ({ page }) => {
    await login(page, TEST_USER1_EMAIL, TEST_USER1_PWD);
    const habit_title = "拉筋";
    await page.goto("http://localhost:3000/create");
    await expect(page).toHaveURL("/create");
    createHabit(page, habit_title, "2", "一次");
    await page.waitForURL("http://localhost:3000/manage");
    await expect(page).toHaveURL("/manage");
    await expect(
      page.getByRole("heading", { name: habit_title })
    ).toBeVisible();
  });

  test("2-2. testuser1-create-habit-2:", async ({ page }) => {
    await login(page, TEST_USER1_EMAIL, TEST_USER1_PWD);
    const habit_title = "睡滿八小時";
    await page.goto("http://localhost:3000/create");
    await expect(page).toHaveURL("/create");
    createHabit(page, habit_title, "1", "一次");
    await page.waitForURL("http://localhost:3000/manage");
    await expect(page).toHaveURL("/manage");
    await expect(
      page.getByRole("heading", { name: habit_title })
    ).toBeVisible();
  });

  test("2-3. testuser2-create-habit-1:", async ({ page }) => {
    await login(page, TEST_USER2_EMAIL, TEST_USER2_PWD);
    const habit_title = "吃60g蛋白質";
    await page.goto("http://localhost:3000/create");
    await expect(page).toHaveURL("/create");
    createHabit(page, habit_title, "2", "30g");
    await page.waitForURL("http://localhost:3000/manage");
    await expect(page).toHaveURL("/manage");
    await expect(
      page.getByRole("heading", { name: habit_title })
    ).toBeVisible();
  });
});

const createHabit = async (
  page: Page,
  habit_title: string,
  times: string,
  unit: string
) => {
  await page.getByPlaceholder("習慣標題").click();
  await page.getByPlaceholder("習慣標題").fill(habit_title);
  await page.getByPlaceholder("習慣每日次數").click();
  await page.getByPlaceholder("習慣每日次數").fill(times);
  await page.getByPlaceholder("習慣單位 (e.g. 500 c.c.)").click();
  await page.getByPlaceholder("習慣單位 (e.g. 500 c.c.)").fill(unit);
  const now = new Date();
  const year = now.getFullYear();
  const month = now.toLocaleString("en-US", { month: "short" }); // 'short' for abbreviation
  const date = now.getDate();
  await page
    .getByRole("button", {
      name: `${month} ${date}, ${year} - ${month} ${date}`,
    })
    .click();
  await page.getByLabel("Go to next month").click();
  await page.getByLabel("Go to next month").click();
  await page.getByLabel("Go to next month").click();
  await page.getByRole("gridcell", { name: "24" }).click();
  await page.getByRole("button", { name: "確認" }).click();
  await page.getByText("一").click();
  await page.getByText("二").click();
  await page.getByText("三").click();
  await page.getByText("四").click();
  await page.getByText("五").click();
  await page.getByText("六").click();
  await page.getByText("日", { exact: true }).click();
  await page.getByRole("button", { name: "生成" }).click();
};
