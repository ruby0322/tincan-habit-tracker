import { test, expect, Page } from "@playwright/test";

const TEST_USER1_EMAIL = "testuser1@gmail.com";
const TEST_USER1_PWD = "11112222";
const TEST_USER1_USERNAME = "Morris";
const TEST_USER2_EMAIL = "testuser2@gmail.com";
const TEST_USER2_PWD = "33334444";

const login = async (page: Page, email: string, password: string) => {
  await page.goto("http://localhost:3000");
  await page.getByRole("link", { name: "未登入" }).click();
  await page.getByPlaceholder("you@example.com").click();
  await page.getByPlaceholder("you@example.com").fill(email);
  await page.getByText("密碼").click();
  await page.getByRole("button", { name: "登入" }).click();
  await page.getByPlaceholder("••••••••").click();
  await page.getByPlaceholder("••••••••").fill(password);
  await page.getByRole("button", { name: "登入" }).click();
  await page.waitForURL("http://localhost:3000/manage");
  await expect(page).toHaveURL("/manage");
};

const signup = async (page: Page, email: string, password: string) => {
  await page.getByRole("link", { name: "未登入" }).click();
  await expect(page).toHaveURL("/login");
  await page.getByPlaceholder("you@example.com").click();
  await page.getByPlaceholder("you@example.com").fill(email);
  await page.getByPlaceholder("••••••••").click();
  await page.getByPlaceholder("••••••••").fill(password);
  await page.getByRole("button", { name: "註冊" }).click();
  await page.waitForURL("http://localhost:3000/manage");
  await expect(page).toHaveURL("/manage");
};

export {
  login,
  signup,
  TEST_USER1_EMAIL,
  TEST_USER1_PWD,
  TEST_USER1_USERNAME,
  TEST_USER2_EMAIL,
  TEST_USER2_PWD,
};
