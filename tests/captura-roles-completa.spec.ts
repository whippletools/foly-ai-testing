import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Capturar todas las vistas completas de Roles con matriz de permisos', async ({ page }) => {
  const dir = path.resolve('manual-screenshots/roles');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  await page.goto('/solicitudes-credito', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Expandir Catálogos y entrar a Roles
  await page.getByText(/^Catálogos$/i).first().click();
  await page.waitForTimeout(1000);
  const subitemRoles = page.locator('nav, aside, [role="navigation"]').getByText(/^Roles$/i).first();
  await subitemRoles.click();
  await page.waitForTimeout(3000);

  // 1. Listado Principal
  await page.screenshot({ path: path.join(dir, '01-listado-roles.png') });

  // 2. Búsqueda
  const searchInput = page.getByPlaceholder(/buscar/i).first();
  if (await searchInput.isVisible()) {
    await searchInput.fill('Vendedor');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(dir, '02-busqueda-filtrada.png') });
    await searchInput.fill('');
    await page.waitForTimeout(1000);
  }

  // 3. Modal Nuevo Rol (con matriz de permisos desmarcada)
  const btnNuevo = page.getByRole('button', { name: /^Nuevo$/i }).first();
  await btnNuevo.click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(dir, '03-modal-nuevo-rol-permisos.png') });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(1000);

  // 4. Menú de 3 puntos
  const menuBtn = page.locator('tbody tr button').first();
  if (await menuBtn.isVisible()) {
    await menuBtn.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(dir, '04-menu-acciones-abierto.png') });

    // 5. Modal Editar Rol (con matriz de permisos ya configurada)
    const editarOpt = page.getByRole('menuitem', { name: /editar/i }).or(page.getByText(/^Editar$/i)).first();
    if (await editarOpt.isVisible()) {
      await editarOpt.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(dir, '05-modal-editar-rol-permisos.png') });
      await page.keyboard.press('Escape');
      await page.waitForTimeout(1000);
    }
  }

  console.log('¡Todas las capturas de Roles listas!');
});
