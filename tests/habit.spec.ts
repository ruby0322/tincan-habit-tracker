import { test, expect } from '@playwright/test';

test.describe('habit', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto('http://localhost:3000');
    await page.getByRole('link', { name: '未登入' }).click();
    await page.getByPlaceholder('you@example.com').click();
    await page.getByPlaceholder('you@example.com').fill('mchen127.p@gmail.com');
    await page.getByText('密碼').click();
    await page.getByRole('button', { name: '登入' }).click();
    await page.getByPlaceholder('••••••••').click();
    await page.getByPlaceholder('••••••••').fill('11223344');
    await page.getByRole('button', { name: '登入' }).click();
  });

  test('create-habit', async ({ page }) => {
    await expect(page).toHaveURL("/manage");
    // await page.locator('a:nth-child(3)').click();
    await page.goto('http://localhost:3000/create');
    await expect(page).toHaveURL("/create");
    await page.getByPlaceholder('習慣標題').click();
    await page.getByPlaceholder('習慣標題').fill('喝水3000c.c.');
    await page.getByPlaceholder('習慣每日次數').click();
    await page.getByPlaceholder('習慣每日次數').fill('6');
    await page.getByPlaceholder('習慣單位 (e.g. 500 c.c.)').click();
    await page.getByPlaceholder('習慣單位 (e.g. 500 c.c.)').fill('500c.c.');
    await page.getByRole('button', { name: 'May 28, 2024 - May 28,' }).click();
    await page.getByLabel('Go to next month').click();
    await page.getByLabel('Go to next month').click();
    await page.getByLabel('Go to next month').click();
    await page.getByRole('gridcell', { name: '24' }).click();
    await page.getByRole('button', { name: '確認' }).click();
    await page.getByText('一').click();
    await page.getByText('二').click();
    await page.getByText('三').click();
    await page.getByText('四').click();
    await page.getByText('五').click();
    await page.getByText('六').click();
    await page.getByText('日', { exact: true }).click();
    await page.getByRole('button', { name: '生成' }).click();
    await page.waitForURL('http://localhost:3000/manage');
    await expect(page).toHaveURL('/manage');
    // await page.reload();
    await expect(page.getByRole('heading', { name: '喝水3000c.c.' })).toBeVisible();
  });


});
