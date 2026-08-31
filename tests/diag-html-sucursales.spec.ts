import { test } from '@playwright/test';

test('Diagnostico exacto tabla sucursales', async ({ page }) => {
  await page.goto('/catalogos/sucursales', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(4000);

  const html = await page.evaluate(() => {
    return document.querySelector('table')?.outerHTML || document.body.innerHTML.slice(0, 500);
  });
  console.log('TABLA HTML (primeros 1000):', html.slice(0, 1000));
});
