import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Captura de pantallas para Manual de Usuario - Catálogos', () => {
  test.use({ 
    storageState: 'playwright/.auth/user.json',
    viewport: { width: 1440, height: 900 }
  });

  test('Capturar Artículos (Listado y Formulario)', async ({ page }) => {
    const dir = path.resolve('manual-screenshots');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    // 1. Ir a catálogo de artículos
    await page.goto('/catalogos/articulos', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);

    // Screenshot 1: Tabla de Artículos
    await page.screenshot({ path: path.join(dir, 'articulos-listado.png'), fullPage: false });

    // Screenshot 2: Formulario Nuevo Artículo
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button, a'));
      const b = btns.find(el => el.textContent?.trim().toLowerCase() === 'nuevo');
      if (b) (b as HTMLElement).click();
    });
    await page.waitForTimeout(2500);
    await page.screenshot({ path: path.join(dir, 'articulos-formulario.png'), fullPage: false });
  });
});
