import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Manual Exhaustivo - Catálogos > Proveedores', () => {
  test.use({ 
    storageState: 'playwright/.auth/user.json',
    viewport: { width: 1440, height: 900 }
  });

  test('Capturar todas las vistas, modales y datos de Proveedores', async ({ page }) => {
    const dir = path.resolve('manual-screenshots/proveedores');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    // 1. Navegar por sidebar
    await page.goto('/solicitudes-credito', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // Expandir Catálogos y hacer clic en Proveedores
    await page.getByText(/^Catálogos$/i).first().click();
    await page.waitForTimeout(1000);

    const subitemProveedores = page.locator('nav, aside, [role="navigation"]').getByText(/^Proveedores$/i).first();
    await subitemProveedores.click();
    await page.waitForTimeout(3500);

    console.log('URL actual:', page.url());

    // Captura 1: Listado General de Proveedores
    await page.screenshot({ path: path.join(dir, '01-listado-proveedores.png') });
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
    console.log('DATOS CATALOGO PROVEEDORES:', JSON.stringify(tablaData, null, 2));

    // Captura 2: Búsqueda dinámica
    const searchInput = page.getByPlaceholder(/buscar/i).first();
    if (await searchInput.isVisible()) {
      await searchInput.fill('Muebles');
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(dir, '02-busqueda-filtrada.png') });
      await searchInput.fill('');
      await page.waitForTimeout(1000);
    }

    // Captura 3: Tabs de Filtro (Activos / Inactivos)
    const tabActivos = page.getByRole('button', { name: /^Activos$/i }).or(page.getByText(/^Activos$/i)).first();
    if (await tabActivos.isVisible()) {
      await tabActivos.click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(dir, '03-filtro-activos.png') });
      const tabTodos = page.getByRole('button', { name: /^Todos$/i }).or(page.getByText(/^Todos$/i)).first();
      if (await tabTodos.isVisible()) await tabTodos.click();
      await page.waitForTimeout(1000);
    }

    // Captura 4: Modal / Formulario Nuevo Proveedor
    const btnNuevo = page.getByRole('button', { name: /^Nuevo$/i }).or(page.getByText(/^Nuevo proveedor/i)).first();
    if (await btnNuevo.isVisible()) {
      await btnNuevo.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(dir, '04-modal-nuevo-proveedor.png') });
      console.log('Captura 4 lista (Nuevo Proveedor)');

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
      console.log('CAMPOS MODAL NUEVO PROVEEDOR:', JSON.stringify(modalData, null, 2));

      // Ver si hay tabs dentro del formulario de nuevo proveedor
      const subTabs = page.locator('[role="dialog"] [role="tab"], [role="dialog"] .MuiTab-root');
      const countTabs = await subTabs.count();
      if (countTabs > 1) {
        for (let i = 1; i < countTabs; i++) {
          await subTabs.nth(i).click();
          await page.waitForTimeout(1000);
          await page.screenshot({ path: path.join(dir, `04-subtab-${i + 1}-nuevo-proveedor.png`) });
        }
      }

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
      console.log('OPCIONES MENU PROVEEDORES:', opciones);

      // Clic en Editar
      const editarOpt = page.getByRole('menuitem', { name: /editar/i }).or(page.getByText(/^Editar$/i)).first();
      if (await editarOpt.isVisible()) {
        await editarOpt.click();
        await page.waitForTimeout(2000);
        await page.screenshot({ path: path.join(dir, '06-modal-editar-proveedor.png') });
        await page.keyboard.press('Escape');
        await page.waitForTimeout(1000);
      }

      // Clic en Desactivar / Eliminar
      await menuBtn.click();
      await page.waitForTimeout(1000);
      const desactivarOpt = page.getByRole('menuitem', { name: /desactivar|eliminar/i }).first();
      if (await desactivarOpt.isVisible()) {
        await desactivarOpt.click();
        await page.waitForTimeout(1500);
        await page.screenshot({ path: path.join(dir, '07-dialogo-desactivar-proveedor.png') });
        await page.keyboard.press('Escape');
        await page.waitForTimeout(1000);
      }
    }

    // Captura 6: Clic en la primera fila para ver si abre detalle / ficha
    const primeraFila = page.locator('tbody tr').first();
    if (await primeraFila.isVisible()) {
      await primeraFila.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(dir, '08-detalle-proveedor-fila.png') });
    }

    console.log('¡Catálogo de Proveedores capturado al 100%!');
  });
});
