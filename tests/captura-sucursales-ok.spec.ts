import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Capturar todo Sucursales esperando carga de API', async ({ page }) => {
  const dir = path.resolve('manual-screenshots/sucursales');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  await page.goto('/catalogos/sucursales', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(4000);

  // 1. Listado Principal
  await page.screenshot({ path: path.join(dir, '01-listado-sucursales.png') });

  // 2. Búsqueda
  const searchInput = page.getByPlaceholder(/buscar/i).first();
  await searchInput.fill('Altamira');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(dir, '02-busqueda-filtrada.png') });
  await searchInput.fill('');
  await page.waitForTimeout(1500);

  // 3. Modal Nueva Sucursal
  const btnNuevo = page.getByRole('button', { name: /^Nuevo$/i }).first();
  await btnNuevo.click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(dir, '03-modal-nueva-sucursal.png') });

  // Cerrar modal
  await page.keyboard.press('Escape');
  await page.waitForTimeout(2000);

  // 4. Menú de 3 puntos en fila cargada
  const menuButtons = page.locator('tbody tr button');
  const count = await menuButtons.count();
  console.log('Botones en tabla:', count);
  if (count > 0) {
    await menuButtons.first().click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(dir, '04-menu-acciones-abierto.png') });

    // Modal Editar
    const editarOpt = page.getByRole('menuitem', { name: /editar/i }).or(page.getByText(/^Editar$/i)).first();
    if (await editarOpt.isVisible()) {
      await editarOpt.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(dir, '05-modal-editar-sucursal.png') });
      await page.keyboard.press('Escape');
      await page.waitForTimeout(2000);
    }

    // Diálogo Desactivar
    await menuButtons.first().click();
    await page.waitForTimeout(1000);
    const desactivarOpt = page.getByRole('menuitem', { name: /desactivar/i }).or(page.getByText(/^Desactivar$/i)).first();
    if (await desactivarOpt.isVisible()) {
      await desactivarOpt.click();
      await page.waitForTimeout(1500);
      await page.screenshot({ path: path.join(dir, '06-dialogo-desactivar-sucursal.png') });
      await page.keyboard.press('Escape');
    }
  }

  console.log('¡Todas las capturas de Sucursales listas!');
});
