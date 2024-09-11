import { test, expect, defineConfig } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
})

test('has title', async ({ page }) => {
  await expect(page).toHaveTitle(/ESPN - Serving Sports Fans. Anytime. Anywhere./);
});

test('conduct a search on the homepage', async ({ page }) => {
  await page.getByLabel('Open Search').click();
  await page.getByPlaceholder('Search Sports, Teams or').fill('Lakers');
  await page.getByRole('button', { name: 'Submit'}).press('Enter');
  await expect(page.getByRole('link', { name: 'Los Angeles Lakers Los'})).toContainText('Los Angeles Lakers');
});

test('navigate to Lakers page via NBA dropdown', async ({ page }) => {
  await page.getByLabel('NBA', { exact: true }).hover();
  await page.getByRole('link', { name: 'Los Angeles Lakers', exact: true }).click();
  await expect(page).toHaveURL(/los-angeles-lakers/);
});

test('should select WNBA when hovering over Ellipses dropdown', async ({ page }) => {
  await page.getByLabel('More Sports').hover();
  await page.getByRole('link', { name: 'WNBA', exact: true }).click();
  await expect(page).toHaveURL(/wnba/);
});

test('should select Home when hovering over NBA dropdown', async ({ page }) => {
  await page.getByLabel('NBA', { exact: true }).hover();
  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page).toHaveURL(/nba/);
});
