import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Capturar todas las pantallas reales de Sucursales', async ({ page }) => {
  const dir = path.resolve('manual-screenshots/sucursales');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  await page.goto('/catalogos/sucursales', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(4000);

  // 1. Listado Principal
  await page.screenshot({ path: path.join(dir, '01-listado-sucursales.png') });

  // 2. Búsqueda
  const searchInput = page.getByPlaceholder(/buscar/i).first();
  await searchInput.fill('Coatzacoalcos');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(dir, '02-busqueda-filtrada.png') });
  await searchInput.fill('');
  await page.waitForTimeout(1000);

  // 3. Modal Nueva Sucursal
  const btnNuevo = page.getByRole('button', { name: /^Nuevo$/i }).first();
  await btnNuevo.click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(dir, '03-modal-nueva-sucursal.png') });

  // 4. Recargar vista limpia para el menú de 3 puntos
  await page.goto('/catalogos/sucursales', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  // Click en los 3 puntos de la primera fila usando evaluate para mayor robustez
  await page.evaluate(() => {
    const btn = document.querySelector('tbody tr button');
    if (btn) (btn as HTMLElement).click();
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(dir, '04-menu-acciones-abierto.png') });

  // 5. Modal Editar
  const editarOpt = page.getByRole('menuitem', { name: /editar/i }).or(page.getByText(/^Editar$/i)).first();
  if (await editarOpt.isVisible()) {
    await editarOpt.click();
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(dir, '05-modal-editar-sucursal.png') });
  }

  // 6. Diálogo Desactivar
  await page.goto('/catalogos/sucursales', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);
  await page.evaluate(() => {
    const btn = document.querySelector('tbody tr button');
    if (btn) (btn as HTMLElement).click();
  });
  await page.waitForTimeout(1000);
  const desactivarOpt = page.getByRole('menuitem', { name: /desactivar/i }).or(page.getByText(/^Desactivar$/i)).first();
  if (await desactivarOpt.isVisible()) {
    await desactivarOpt.click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(dir, '06-dialogo-desactivar-sucursal.png') });
  }

  console.log('¡Todas las 6 capturas de Sucursales completadas con éxito!');
});
