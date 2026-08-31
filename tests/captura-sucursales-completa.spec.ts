import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Capturar todas las pantallas y modales de Sucursales', async ({ page }) => {
  const dir = path.resolve('manual-screenshots/sucursales');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  await page.goto('/catalogos/sucursales', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  // 1. Listado Principal
  await page.screenshot({ path: path.join(dir, '01-listado-sucursales.png') });

  // 2. Búsqueda
  const searchInput = page.getByPlaceholder(/buscar/i).first();
  await searchInput.fill('Altamira');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(dir, '02-busqueda-filtrada.png') });
  await searchInput.fill('');
  await page.waitForTimeout(1000);

  // 3. Filtro por tabs (Activas / Inactivas)
  const tabActivas = page.getByRole('button', { name: /^Activas$/i }).or(page.getByText(/^Activas$/i)).first();
  if (await tabActivas.isVisible()) {
    await tabActivas.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(dir, '03-filtro-activas.png') });
    const tabTodos = page.getByRole('button', { name: /^Todos$/i }).or(page.getByText(/^Todos$/i)).first();
    if (await tabTodos.isVisible()) await tabTodos.click();
    await page.waitForTimeout(1000);
  }

  // 4. Modal Nueva Sucursal
  const btnNuevo = page.getByRole('button', { name: /^Nuevo$/i }).first();
  await btnNuevo.click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(dir, '04-modal-nueva-sucursal.png') });

  const modalInfo = await page.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"]');
    return {
      text: (dialog as HTMLElement)?.innerText,
      inputs: Array.from(dialog?.querySelectorAll('input, select, textarea') || []).map(i => ({
        placeholder: (i as HTMLInputElement).placeholder,
        name: (i as HTMLInputElement).name,
        type: (i as HTMLInputElement).type
      }))
    };
  });
  console.log('INFO MODAL SUCURSAL:', JSON.stringify(modalInfo, null, 2));

  // Recargar vista para interactuar con la tabla
  await page.goto('/catalogos/sucursales', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);

  // 5. Menú de 3 puntos
  const menuBtn = page.locator('tbody tr button').first();
  await menuBtn.click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(dir, '05-menu-acciones-abierto.png') });

  // 6. Modal Editar
  const editarOpt = page.getByRole('menuitem', { name: /editar/i }).or(page.getByText(/^Editar$/i)).first();
  if (await editarOpt.isVisible()) {
    await editarOpt.click();
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(dir, '06-modal-editar-sucursal.png') });
  }

  // Recargar para diálogo desactivar
  await page.goto('/catalogos/sucursales', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);
  const menuBtn2 = page.locator('tbody tr button').first();
  await menuBtn2.click();
  await page.waitForTimeout(1000);
  const desactivarOpt = page.getByRole('menuitem', { name: /desactivar/i }).or(page.getByText(/^Desactivar$/i)).first();
  if (await desactivarOpt.isVisible()) {
    await desactivarOpt.click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(dir, '07-dialogo-desactivar-sucursal.png') });
  }

  console.log('¡Todas las 7 capturas de Sucursales listas!');
});
