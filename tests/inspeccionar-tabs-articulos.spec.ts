import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Inspeccionar tabs exactos del formulario de Articulos', async ({ page }) => {
  await page.goto('/catalogos/productos/nuevo', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  const tabs = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('[role="tab"], .MuiTab-root, button')).map(t => t.textContent?.trim()).filter(Boolean);
  });
  console.log('TABS ENCONTRADOS:', JSON.stringify(tabs, null, 2));

  const dir = path.resolve('manual-screenshots/articulos');

  // Clic en cada tab disponible por su índice o texto
  const tabElements = page.locator('[role="tab"], .MuiTab-root');
  const count = await tabElements.count();
  console.log('Cantidad de tabs:', count);

  for (let i = 0; i < count; i++) {
    const tab = tabElements.nth(i);
    const tabName = await tab.textContent();
    console.log(`Haciendo clic en tab ${i}: ${tabName}`);
    await tab.click();
    await page.waitForTimeout(1000);
    const filename = `tab-${i + 1}-${tabName?.toLowerCase().replace(/[^a-z0-9]/g, '-')}.png`;
    await page.screenshot({ path: path.join(dir, filename) });
  }
});
