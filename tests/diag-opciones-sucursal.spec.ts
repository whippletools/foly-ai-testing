import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Diagnostico opciones menu sucursal', async ({ page }) => {
  const dir = path.resolve('manual-screenshots/sucursales');
  await page.goto('/catalogos/sucursales', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(4000);

  // Clic en el botón de la primera fila
  const btn = page.locator('tbody tr button').first();
  await btn.click();
  await page.waitForTimeout(1000);

  const opts = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('[role="menuitem"], .MuiMenuItem-root, button')).map(el => el.textContent?.trim()).filter(Boolean);
  });
  console.log('OPCIONES MENU SUCURSAL:', JSON.stringify(opts, null, 2));

  await page.screenshot({ path: path.join(dir, '05-menu-opciones.png') });

  // Probar clic en la primera opción
  const primeraOpcion = page.locator('[role="menuitem"], .MuiMenuItem-root').first();
  if (await primeraOpcion.isVisible()) {
    const optText = await primeraOpcion.textContent();
    console.log('Haciendo clic en:', optText);
    await primeraOpcion.click();
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(dir, '06-accion-resultado.png') });
  }
});
