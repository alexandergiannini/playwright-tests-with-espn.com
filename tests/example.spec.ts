import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/ESPN - Serving Sports Fans. Anytime. Anywhere./);
});

test('conduct a search on the homepage', async ({ page }) => {
  await page.goto('/');

  //await expect(page.locator('#global-search')).toBeInViewport();

  await page.locator("//a[@id='global-search-trigger']").click();

  await page.locator("//input[@id='global-search-input']").fill('Lakers');

  await page.locator("//input[@id='global-search-input']").press('Enter');

  await expect(page.locator('.LogoTile__Title')).toContainText('Los Angeles Lakers');

  // Click the get started link.
  // await page.getByRole('link', { name: 'Subscribe Now' }).click();

  // Expects page to have a heading with the name of Installation.
  //await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('navigate to sign in page', async ({page}) => {
  await page.goto('/');
  await page.locator("//a[@id='global-user-trigger']").hover();
  await page.getByRole('button', { name: "Sign Up"}).click();
  //await expect(page.getByRole('heading', { name: 'Enter your email' })).toBeVisible();
  //await expect(page.getByText('Enter your email')).toBeVisible();
  await expect(page.locator(".modal-body")).toBeVisible();
  //await expect(page.getByRole('text', {name: "Enter your email"})).toBeVisible();
})
