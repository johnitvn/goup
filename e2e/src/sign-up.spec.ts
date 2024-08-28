import { expect, test } from '@playwright/test';
import { URLHelper } from './utils/url-helper';

test('should has title', async ({ page }) => {
  await page.goto(URLHelper.homeUrl('/'));
  expect(await page.locator('h1').innerText()).toContain('Goup');
});
