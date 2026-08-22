import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Manual Exhaustivo - Catálogos > Metas', () => {
  test.use({ 
    storageState: 'playwright/.auth/user.json',
    viewport: { width: 1440, height: 900 }
  });

  test('Capturar todas las vistas, modales y acciones de Metas', async ({ page }) => {
    const dir = path.resolve('manual-screenshots/metas');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    // 1. Navegar por sidebar
    await page.goto('/solicitudes-credito', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // Expandir Catálogos y hacer clic en Metas
    await page.getByText(/^Catálogos$/i).first().click();
    await page.waitForTimeout(1000);

    const subitemMetas = page.locator('nav, aside, [role="navigation"]').getByText(/^Metas$/i).first();
    await subitemMetas.click();
    await page.waitForTimeout(3500);

    console.log('URL actual:', page.url());

    // Captura 1: Listado General de Metas
    await page.screenshot({ path: path.join(dir, '01-listado-metas.png') });
    console.log('Captura 1 lista (Listado)');

    // Extraer datos de la tabla
    const tablaData = await page.evaluate(() => {
      const title = document.querySelector('h1, h2')?.textContent?.trim();
      const ths = Array.from(document.querySelectorAll('th')).map(th => th.textContent?.trim());
      const filas = Array.from(document.querySelectorAll('tbody tr')).map(tr => 
        Array.from(tr.querySelectorAll('td')).map(td => td.textContent?.trim().replace(/\s+/g, ' '))
      );
      const tabs = Array.from(document.querySelectorAll('[role="tab"], .MuiTab-root, button')).map(t => t.textContent?.trim()).filter(Boolean);
      return { title, url: window.location.pathname, ths, filas: filas.slice(0, 5), tabs };
    });
    console.log('DATOS CATALOGO METAS:', JSON.stringify(tablaData, null, 2));

    // Captura 2: Búsqueda dinámica
    const searchInput = page.getByPlaceholder(/buscar/i).first();
    if (await searchInput.isVisible()) {
      await searchInput.fill('Ventas');
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(dir, '02-busqueda-filtrada.png') });
      await searchInput.fill('');
      await page.waitForTimeout(1000);
    }

    // Captura 3: Tabs de Filtro si existen (Todos / Activas / Inactivas)
    const tabsList = page.locator('[role="tab"], .MuiTab-root');
    const tabCount = await tabsList.count();
    if (tabCount > 1) {
      await tabsList.nth(1).click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(dir, '03-filtro-pestana.png') });
      await tabsList.nth(0).click();
      await page.waitForTimeout(1000);
    }

    // Captura 4: Modal / Formulario Nueva Meta
    const btnNuevo = page.getByRole('button', { name: /^Nuevo$/i }).or(page.getByText(/^Nueva meta/i)).first();
    if (await btnNuevo.isVisible()) {
      await btnNuevo.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(dir, '04-modal-nueva-meta.png') });
      console.log('Captura 4 lista (Nueva Meta)');

      const modalData = await page.evaluate(() => {
        const dialog = document.querySelector('[role="dialog"], form') || document.body;
        return {
          text: (dialog as HTMLElement)?.innerText,
          labels: Array.from(dialog.querySelectorAll('label, legend, h2, h3, h4, p')).map(l => l.textContent?.trim()).filter(Boolean),
          inputs: Array.from(dialog.querySelectorAll('input, select, textarea')).map(i => ({
            placeholder: (i as HTMLInputElement).placeholder,
            name: (i as HTMLInputElement).name,
            type: (i as HTMLInputElement).type
          }))
        };
      });
      console.log('CAMPOS MODAL NUEVA META:', JSON.stringify(modalData, null, 2));

      await page.keyboard.press('Escape');
      await page.waitForTimeout(1000);
    }

    // Captura 5: Menú de Acciones (3 puntos)
    const menuBtn = page.locator('tbody tr button').first();
    if (await menuBtn.isVisible()) {
      await menuBtn.click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(dir, '05-menu-acciones-abierto.png') });

      const opciones = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('[role="menuitem"], .MuiMenuItem-root, button')).map(el => el.textContent?.trim()).filter(Boolean);
      });
      console.log('OPCIONES MENU METAS:', opciones);

      // Clic en Editar
      const editarOpt = page.getByRole('menuitem', { name: /editar/i }).or(page.getByText(/^Editar$/i)).first();
      if (await editarOpt.isVisible()) {
        await editarOpt.click();
        await page.waitForTimeout(2000);
        await page.screenshot({ path: path.join(dir, '06-modal-editar-meta.png') });
        await page.keyboard.press('Escape');
        await page.waitForTimeout(1000);
      }
    }

    console.log('¡Catálogo de Metas capturado al 100%!');
  });
});
