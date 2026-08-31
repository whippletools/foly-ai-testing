import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Capturar detalle al hacer clic en fila de Sucursal', async ({ page }) => {
  const dir = path.resolve('manual-screenshots/sucursales');
  await page.goto('/catalogos/sucursales', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(4000);

  // Clic en la primera fila (ej. Foly Muebles Tampico Centro)
  await page.evaluate(() => {
    const row = document.querySelector('tbody tr');
    if (row) (row as HTMLElement).click();
  });

  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(dir, '05-detalle-edicion-sucursal.png') });
  console.log('Captura 5 guardada!');
});
