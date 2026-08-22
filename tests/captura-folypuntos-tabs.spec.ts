import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Capturar todas las pestañas de Folypuntos (Contado, Crédito, Apartado)', async ({ page }) => {
  const dir = path.resolve('manual-screenshots/folypuntos');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  await page.goto('/catalogos/folypuntos', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  // 1. Pestaña Contado
  await page.screenshot({ path: path.join(dir, '01-folypuntos-tab-contado.png') });

  // 2. Pestaña Crédito
  const tabCredito = page.getByRole('tab', { name: /^Crédito$/i }).or(page.getByText(/^Crédito$/i)).first();
  if (await tabCredito.isVisible()) {
    await tabCredito.click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(dir, '02-folypuntos-tab-credito.png') });
  }

  // 3. Pestaña Apartado
  const tabApartado = page.getByRole('tab', { name: /^Apartado$/i }).or(page.getByText(/^Apartado$/i)).first();
  if (await tabApartado.isVisible()) {
    await tabApartado.click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(dir, '03-folypuntos-tab-apartado.png') });
  }

  // 4. Edición de valores de ejemplo
  const tabContado = page.getByRole('tab', { name: /^Contado$/i }).or(page.getByText(/^Contado$/i)).first();
  if (await tabContado.isVisible()) {
    await tabContado.click();
    await page.waitForTimeout(1000);
    const inputs = page.locator('input[type="text"]');
    if (await inputs.count() >= 3) {
      await inputs.nth(0).fill('100');
      await inputs.nth(1).fill('5');
      await inputs.nth(2).fill('2.50');
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(dir, '04-edicion-valores-equivalencias.png') });
    }
  }

  console.log('¡Todas las capturas de Folypuntos listas!');
});
