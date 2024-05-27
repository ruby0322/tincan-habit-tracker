import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/social');
  await page.getByRole('link', { name: '未登入' }).click();
  await page.getByPlaceholder('you@example.com').click();
  await page.getByPlaceholder('you@example.com').fill('mchen127.p@gmail.com');
  await page.getByPlaceholder('••••••••').click();
  await page.getByPlaceholder('••••••••').fill('11223344');
  await page.getByRole('button', { name: '登入' }).click();
  await page.getByRole('heading', { name: '拉筋' }).click();
  await page.getByText('發文報告刪除').nth(1).click();
  await page.goto('http://localhost:3000/manage');
  await page.getByText('/ 2').nth(1).click();
  await page.getByText('(一次)').click();
});