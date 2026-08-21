import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Captura real de Catálogos > Artículos', () => {
  test.use({ storageState: 'playwright/.auth/user.json' });

  test('Capturar pantalla real de Artículos y su formulario', async ({ page }) => {
    const dir = path.resolve('manual-screenshots');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    // 1. Ir al dashboard principal
    await page.goto('/solicitudes-credito', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // 2. Expandir Catálogos en el menú lateral
    await page.getByText(/^Catálogos$/i).first().click();
    await page.waitForTimeout(1000);

    // 3. Clic en Artículos
    await page.getByText(/^Artículos$/i).first().click();
    await page.waitForTimeout(3000);

    // 4. Tomar Screenshot 1: Tabla de Artículos
    const p1 = path.join(dir, 'articulos-01-tabla-real.png');
    await page.screenshot({ path: p1, fullPage: false });
    console.log('Captura 1 tomada en URL:', page.url(), 'Bytes:', fs.statSync(p1).size);

    // 5. Clic en botón Nuevo Artículo
    const btnNuevo = page.getByRole('button', { name: /^Nuevo$/i }).first();
    await btnNuevo.click();
    await page.waitForTimeout(2000);

    // 6. Tomar Screenshot 2: Formulario de Alta
    const p2 = path.join(dir, 'articulos-02-formulario-real.png');
    await page.screenshot({ path: p2, fullPage: false });
    console.log('Captura 2 tomada en URL:', page.url(), 'Bytes:', fs.statSync(p2).size);
  });
});
