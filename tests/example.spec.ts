import { test, expect, defineConfig } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/ESPN - Serving Sports Fans. Anytime. Anywhere./);
});

test('conduct a search on the homepage', async ({ page }) => {
  await page.goto('/');
  await page.locator("//a[@id='global-search-trigger']").click();
  await page.locator("//input[@id='global-search-input']").fill('Lakers');
  await page.locator("//input[@id='global-search-input']").press('Enter');
  await expect(page.locator('.LogoTile__Title')).toContainText('Los Angeles Lakers');
});

test('navigate to Lakers page via NBA dropdown', async ({ page }) => {
  await page.goto('/');
  await page.locator("//header/nav[@id='global-nav']/ul[1]/li[2]").hover();
  await page.locator("//span[contains(text(),'Los Angeles Lakers')]").click();
  await expect(page).toHaveURL(/los-angeles-lakers/);
})
