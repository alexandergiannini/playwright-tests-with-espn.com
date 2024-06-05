import { test, expect, defineConfig } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
})

test('has title', async ({ page }) => {
  await expect(page).toHaveTitle(/ESPN - Serving Sports Fans. Anytime. Anywhere./);
});

test('conduct a search on the homepage', async ({ page }) => {
  await page.locator("//a[@id='global-search-trigger']").click();
  await page.locator("//input[@id='global-search-input']").fill('Lakers');
  await page.locator("//input[@id='global-search-input']").press('Enter');
  await expect(page.locator('.LogoTile__Title')).toContainText('Los Angeles Lakers');
});

test('navigate to Lakers page via NBA dropdown', async ({ page }) => {
  await page.locator("//header/nav[@id='global-nav']/ul[1]/li[2]").hover();
  await page.locator("//span[contains(text(),'Los Angeles Lakers')]").click();
  await expect(page).toHaveURL(/los-angeles-lakers/);
});

test('should select Los Angeles when hovering over More option', async ({ page }) => {
  await page.locator('.more-espn').hover();
  await page.locator("//a[@name='&lpos=sitenavdefault+more_los_angeles']").click();
  await expect(page.locator("//h2[contains(text(),'Los Angeles teams')]")).toBeVisible();
});

test('should click first article within Top Headlines section', async ({ page }) => {
  await page.locator("//a[@name='&lpos=fp:feed:1:coll:headlines:1']").click();
  await expect(page.locator('.article-header')).toBeVisible();
});
