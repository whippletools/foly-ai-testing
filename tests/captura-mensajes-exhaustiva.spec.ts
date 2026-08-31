import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Capturar todas las pantallas y modales de Catálogo de Mensajes', async ({ page }) => {
  const dir = path.resolve('manual-screenshots/mensajes');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  await page.goto('/solicitudes-credito', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Expandir Catálogos y entrar a Mensajes
  await page.getByText(/^Catálogos$/i).first().click();
  await page.waitForTimeout(1000);
  const subitemMensajes = page.locator('nav, aside, [role="navigation"]').getByText(/^Mensajes$/i).first();
  await subitemMensajes.click();
  await page.waitForTimeout(3000);

  // 1. Listado Principal
  await page.screenshot({ path: path.join(dir, '01-listado-mensajes.png') });

  // 2. Búsqueda
  const searchInput = page.getByPlaceholder(/buscar/i).first();
  if (await searchInput.isVisible()) {
    await searchInput.fill('recordatorio');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(dir, '02-busqueda-filtrada.png') });
    await searchInput.fill('');
    await page.waitForTimeout(1000);
  }

  // 3. Modal Nuevo Mensaje
  const btnNuevo = page.getByRole('button', { name: /^Nuevo$/i }).first();
  await btnNuevo.click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(dir, '03-modal-nuevo-mensaje.png') });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(1000);

  // 4. Menú de 3 puntos
  const menuBtn = page.locator('tbody tr button').first();
  if (await menuBtn.isVisible()) {
    await menuBtn.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(dir, '04-menu-acciones-abierto.png') });

    // 5. Modal Editar
    const editarOpt = page.getByRole('menuitem', { name: /editar/i }).or(page.getByText(/^Editar$/i)).first();
    if (await editarOpt.isVisible()) {
      await editarOpt.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(dir, '05-modal-editar-mensaje.png') });
      await page.keyboard.press('Escape');
      await page.waitForTimeout(1000);
    }

    // 6. Diálogo Eliminar
    await menuBtn.click();
    await page.waitForTimeout(1000);
    const eliminarOpt = page.getByRole('menuitem', { name: /eliminar/i }).or(page.getByText(/^Eliminar$/i)).first();
    if (await eliminarOpt.isVisible()) {
      await eliminarOpt.click();
      await page.waitForTimeout(1500);
      await page.screenshot({ path: path.join(dir, '06-dialogo-confirmar-eliminar.png') });
      await page.keyboard.press('Escape');
    }
  }

  console.log('¡Todas las capturas de Catálogo de Mensajes listas!');
});
