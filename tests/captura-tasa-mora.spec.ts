import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Manual Exhaustivo - Catálogos > Tasa de mora', () => {
  test.use({ 
    storageState: 'playwright/.auth/user.json',
    viewport: { width: 1440, height: 900 }
  });

  test('Capturar todas las vistas, modales y acciones de Tasa de mora', async ({ page }) => {
    const dir = path.resolve('manual-screenshots/tasa-mora');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    // 1. Navegar por sidebar
    await page.goto('/solicitudes-credito', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // Expandir Catálogos y hacer clic en Tasa de mora
    await page.getByText(/^Catálogos$/i).first().click();
    await page.waitForTimeout(1000);

    const subitemMora = page.locator('nav, aside, [role="navigation"]').getByText(/tasa.*mora/i).first();
    await subitemMora.click();
    await page.waitForTimeout(3500);

    console.log('URL actual:', page.url());

    // Captura 1: Listado General / Configuración de Tasa de Mora
    await page.screenshot({ path: path.join(dir, '01-listado-tasa-mora.png') });
    console.log('Captura 1 lista (Listado)');

    // Extraer datos de la pantalla
    const pageData = await page.evaluate(() => {
      const title = document.querySelector('h1, h2')?.textContent?.trim();
      const ths = Array.from(document.querySelectorAll('th')).map(th => th.textContent?.trim());
      const filas = Array.from(document.querySelectorAll('tbody tr')).map(tr => 
        Array.from(tr.querySelectorAll('td')).map(td => td.textContent?.trim().replace(/\s+/g, ' '))
      );
      const text = document.body.innerText;
      const inputs = Array.from(document.querySelectorAll('input, select, textarea')).map(i => ({
        placeholder: (i as HTMLInputElement).placeholder,
        value: (i as HTMLInputElement).value,
        type: (i as HTMLInputElement).type
      }));
      const tabs = Array.from(document.querySelectorAll('[role="tab"], .MuiTab-root, button')).map(t => t.textContent?.trim()).filter(Boolean);
      return { title, url: window.location.pathname, ths, filas: filas.slice(0, 5), text, inputs, tabs };
    });
    console.log('DATOS CATALOGO TASA DE MORA:', JSON.stringify(pageData, null, 2));

    // Captura 2: Búsqueda dinámica si existe
    const searchInput = page.getByPlaceholder(/buscar/i).first();
    if (await searchInput.isVisible()) {
      await searchInput.fill('Mora');
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(dir, '02-busqueda-filtrada.png') });
      await searchInput.fill('');
      await page.waitForTimeout(1000);
    }

    // Captura 3: Botón Nuevo o Formulario
    const btnNuevo = page.getByRole('button', { name: /^Nuevo$/i }).or(page.getByText(/^Nueva tasa/i)).first();
    if (await btnNuevo.isVisible()) {
      await btnNuevo.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(dir, '03-modal-nueva-tasa-mora.png') });
      console.log('Captura 3 lista (Nueva Tasa)');

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
      console.log('CAMPOS MODAL NUEVA TASA MORA:', JSON.stringify(modalData, null, 2));

      await page.keyboard.press('Escape');
      await page.waitForTimeout(1000);
    }

    // Captura 4: Menú de Acciones (3 puntos)
    const menuBtn = page.locator('tbody tr button').first();
    if (await menuBtn.isVisible()) {
      await menuBtn.click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(dir, '04-menu-acciones-abierto.png') });

      // Clic en Editar
      const editarOpt = page.getByRole('menuitem', { name: /editar/i }).or(page.getByText(/^Editar$/i)).first();
      if (await editarOpt.isVisible()) {
        await editarOpt.click();
        await page.waitForTimeout(2000);
        await page.screenshot({ path: path.join(dir, '05-modal-editar-tasa-mora.png') });
        await page.keyboard.press('Escape');
        await page.waitForTimeout(1000);
      }
    }

    // Si es un formulario directo con inputs de tasa moratoria mensual / anual
    const inputs = page.locator('input');
    if (await inputs.count() > 0) {
      await page.screenshot({ path: path.join(dir, '02-edicion-tasas-moratorias.png') });
    }

    console.log('¡Catálogo de Tasa de Mora capturado al 100%!');
  });
});
