const { test, expect } = require('@playwright/test');

test('homepage visual test', async ({ page }) => {
  await page.goto('https://www.worldtimebuddy.com/');
  await expect(page).toHaveScreenshot('homepage.png');
});