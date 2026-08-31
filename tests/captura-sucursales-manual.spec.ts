import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Manual Exhaustivo - Catálogos > Sucursales', () => {
  test.use({ 
    storageState: 'playwright/.auth/user.json',
    viewport: { width: 1440, height: 900 }
  });

  test('Capturar todas las vistas, modales y acciones de Sucursales', async ({ page }) => {
    const dir = path.resolve('manual-screenshots/sucursales');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    // 1. Navegar por sidebar
    await page.goto('/solicitudes-credito', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);
    await page.getByText(/^Catálogos$/i).first().click();
    await page.waitForTimeout(1000);
    await page.getByText(/^Sucursales$/i).first().click();
    await page.waitForTimeout(3000);

    // Captura 1: Listado General de Sucursales
    await page.screenshot({ path: path.join(dir, '01-listado-sucursales.png') });
    console.log('Captura 1 lista (Listado)');

    // Extraer datos de la tabla
    const tablaData = await page.evaluate(() => {
      const title = document.querySelector('h1, h2')?.textContent?.trim();
      const ths = Array.from(document.querySelectorAll('th')).map(th => th.textContent?.trim());
      const filas = Array.from(document.querySelectorAll('tbody tr')).map(tr => 
        Array.from(tr.querySelectorAll('td')).map(td => td.textContent?.trim().replace(/\s+/g, ' '))
      );
      return { title, url: window.location.pathname, ths, filas: filas.slice(0, 5) };
    });
    console.log('DATOS TABLA SUCURSALES:', JSON.stringify(tablaData, null, 2));

    // Captura 2: Búsqueda dinámica
    const searchInput = page.getByPlaceholder(/buscar/i).first();
    if (await searchInput.isVisible()) {
      await searchInput.fill('Tampico');
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(dir, '02-busqueda-filtrada.png') });
      await searchInput.fill('');
      await page.waitForTimeout(1000);
    }

    // Captura 3: Modal / Formulario Nueva Sucursal
    const btnNuevo = page.getByRole('button', { name: /^Nuevo$/i }).or(page.getByText(/^Nueva sucursal/i)).first();
    if (await btnNuevo.isVisible()) {
      await btnNuevo.click();
      await page.waitForTimeout(2500);
      await page.screenshot({ path: path.join(dir, '03-formulario-nueva-sucursal.png') });
      console.log('Captura 3 lista (Nueva Sucursal)');

      const formFields = await page.evaluate(() => {
        const modal = document.querySelector('[role="dialog"], form') || document.body;
        return {
          url: window.location.pathname,
          text: (modal as HTMLElement).innerText,
          labels: Array.from(modal.querySelectorAll('label, legend, h2, h3, h4, p')).map(l => l.textContent?.trim()).filter(Boolean)
        };
      });
      console.log('CAMPOS FORMULARIO SUCURSAL:', JSON.stringify(formFields, null, 2));

      // Si el formulario tiene pestañas, capturarlas
      const tabsForm = page.locator('[role="tab"]:visible');
      const countTabs = await tabsForm.count();
      for (let t = 0; t < countTabs; t++) {
        const tName = await tabsForm.nth(t).textContent();
        await tabsForm.nth(t).click();
        await page.waitForTimeout(1000);
        await page.screenshot({ path: path.join(dir, `03-tab-${t + 1}-${tName?.toLowerCase().replace(/[^a-z0-9]/g, '-')}.png`) });
      }

      if (page.url().includes('/nuevo') || page.url().includes('/sucursales/')) {
        await page.goto('/catalogos/sucursales', { waitUntil: 'domcontentloaded' });
      } else {
        await page.keyboard.press('Escape');
      }
      await page.waitForTimeout(2000);
    }

    // Captura 4: Menú de Acciones (3 puntos)
    const menuBtn = page.locator('tbody tr button').first();
    if (await menuBtn.isVisible()) {
      await menuBtn.click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(dir, '04-menu-acciones-abierto.png') });

      const opciones = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('[role="menuitem"], button')).map(el => el.textContent?.trim()).filter(Boolean);
      });
      console.log('OPCIONES MENU SUCURSALES:', opciones);

      // Clic en Editar
      const editarOpt = page.getByRole('menuitem', { name: /editar/i }).or(page.getByText(/^Editar$/i)).first();
      if (await editarOpt.isVisible()) {
        await editarOpt.click();
        await page.waitForTimeout(2000);
        await page.screenshot({ path: path.join(dir, '05-modal-editar-sucursal.png') });
        if (page.url().includes('/editar') || page.url().includes('/sucursales/')) {
          await page.goto('/catalogos/sucursales', { waitUntil: 'domcontentloaded' });
        } else {
          await page.keyboard.press('Escape');
        }
        await page.waitForTimeout(2000);
      }

      // Clic en Ver Detalle si existe
      await menuBtn.click();
      await page.waitForTimeout(1000);
      const detalleOpt = page.getByRole('menuitem', { name: /detalle/i }).or(page.getByText(/detalle/i)).first();
      if (await detalleOpt.isVisible()) {
        await detalleOpt.click();
        await page.waitForTimeout(2000);
        await page.screenshot({ path: path.join(dir, '06-vista-detalle-sucursal.png') });
        await page.goto('/catalogos/sucursales', { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(2000);
      }

      // Clic en Desactivar / Eliminar
      await menuBtn.click();
      await page.waitForTimeout(1000);
      const eliminarOpt = page.getByRole('menuitem', { name: /desactivar|eliminar/i }).first();
      if (await eliminarOpt.isVisible()) {
        await eliminarOpt.click();
        await page.waitForTimeout(1500);
        await page.screenshot({ path: path.join(dir, '07-dialogo-confirmar-desactivar.png') });
        await page.keyboard.press('Escape');
      }
    }

    console.log('¡Todas las capturas de Sucursales listas!');
  });
});
