import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Manual Exhaustivo - Catálogos > Folypuntos', () => {
  test.use({ 
    storageState: 'playwright/.auth/user.json',
    viewport: { width: 1440, height: 900 }
  });

  test('Capturar todas las vistas, modales y acciones de Folypuntos', async ({ page }) => {
    const dir = path.resolve('manual-screenshots/folypuntos');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    // 1. Navegar por sidebar
    await page.goto('/solicitudes-credito', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // Expandir Catálogos y hacer clic en Folypuntos
    await page.getByText(/^Catálogos$/i).first().click();
    await page.waitForTimeout(1000);

    const subitemFolypuntos = page.locator('nav, aside, [role="navigation"]').getByText(/^Folypuntos$/i).first();
    await subitemFolypuntos.click();
    await page.waitForTimeout(3500);

    console.log('URL actual:', page.url());

    // Captura 1: Listado General / Configuración de Folypuntos
    await page.screenshot({ path: path.join(dir, '01-listado-folypuntos.png') });
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
    console.log('DATOS CATALOGO FOLYPUNTOS:', JSON.stringify(pageData, null, 2));

    // Captura 2: Búsqueda dinámica si existe
    const searchInput = page.getByPlaceholder(/buscar/i).first();
    if (await searchInput.isVisible()) {
      await searchInput.fill('Puntos');
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(dir, '02-busqueda-filtrada.png') });
      await searchInput.fill('');
      await page.waitForTimeout(1000);
    }

    // Captura 3: Tabs de Filtro si existen
    const tabsList = page.locator('[role="tab"], .MuiTab-root');
    const tabCount = await tabsList.count();
    if (tabCount > 1) {
      await tabsList.nth(1).click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(dir, '03-filtro-pestana.png') });
      await tabsList.nth(0).click();
      await page.waitForTimeout(1000);
    }

    // Captura 4: Botón Nuevo o Formulario
    const btnNuevo = page.getByRole('button', { name: /^Nuevo$/i }).or(page.getByText(/^Nuevo/i)).first();
    if (await btnNuevo.isVisible()) {
      await btnNuevo.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(dir, '04-modal-nuevo-folypuntos.png') });
      console.log('Captura 4 lista (Nuevo)');

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
      console.log('CAMPOS MODAL NUEVO FOLYPUNTOS:', JSON.stringify(modalData, null, 2));

      await page.keyboard.press('Escape');
      await page.waitForTimeout(1000);
    }

    // Captura 5: Menú de Acciones (3 puntos)
    const menuBtn = page.locator('tbody tr button').first();
    if (await menuBtn.isVisible()) {
      await menuBtn.click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(dir, '05-menu-acciones-abierto.png') });

      // Clic en Editar
      const editarOpt = page.getByRole('menuitem', { name: /editar/i }).or(page.getByText(/^Editar$/i)).first();
      if (await editarOpt.isVisible()) {
        await editarOpt.click();
        await page.waitForTimeout(2000);
        await page.screenshot({ path: path.join(dir, '06-modal-editar-folypuntos.png') });
        await page.keyboard.press('Escape');
        await page.waitForTimeout(1000);
      }
    }

    console.log('¡Catálogo de Folypuntos capturado al 100%!');
  });
});
