import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Capturar vistas detalladas de Catálogo de Tasa de Mora', async ({ page }) => {
  const dir = path.resolve('manual-screenshots/tasa-mora');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  await page.goto('/catalogos/tasa-mora', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  // 1. Pantalla Principal
  await page.screenshot({ path: path.join(dir, '01-pantalla-principal-tasa-mora.png') });

  // 2. Edición de porcentaje
  const inputMora = page.locator('input[type="text"]').first();
  await inputMora.click();
  await inputMora.fill('36.00');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(dir, '02-edicion-porcentaje-mora.png') });

  // 3. Regresar a 30.00
  await inputMora.fill('30.00');
  await page.waitForTimeout(1000);

  console.log('¡Capturas de Tasa de Mora listas!');
});
