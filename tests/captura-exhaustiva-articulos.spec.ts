import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Captura exhaustiva de todas las pestañas de Artículos', () => {
  test.use({ 
    storageState: 'playwright/.auth/user.json',
    viewport: { width: 1440, height: 900 }
  });

  test('Capturar todas las pestañas y vistas de Artículos', async ({ page }) => {
    const dir = path.resolve('manual-screenshots/articulos');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    // 1. Navegar a Catálogos > Artículos
    await page.goto('/solicitudes-credito', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);
    await page.getByText(/^Catálogos$/i).first().click();
    await page.waitForTimeout(1000);
    await page.getByText(/^Artículos$/i).first().click();
    await page.waitForTimeout(3000);

    // Captura 1: Listado General
    await page.screenshot({ path: path.join(dir, '01-listado-general.png') });

    // 2. Entrar a Nuevo Artículo
    const btnNuevo = page.getByRole('button', { name: /^Nuevo$/i }).first();
    await btnNuevo.click();
    await page.waitForTimeout(2000);

    // Captura 2: Tab Datos Generales
    await page.screenshot({ path: path.join(dir, '02-tab-datos-generales.png') });

    // Captura 3: Tab Sucursales
    const tabSucursales = page.getByRole('tab', { name: /sucursales/i }).or(page.getByText(/^Sucursales$/i)).first();
    if (await tabSucursales.isVisible()) {
      await tabSucursales.click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(dir, '03-tab-sucursales.png') });
    }

    // Captura 4: Tab Proveedores
    const tabProveedores = page.getByRole('tab', { name: /proveedores/i }).or(page.getByText(/^Proveedores$/i)).first();
    if (await tabProveedores.isVisible()) {
      await tabProveedores.click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(dir, '04-tab-proveedores.png') });
    }

    // Captura 5: Tab Precio
    const tabPrecio = page.getByRole('tab', { name: /precio/i }).or(page.getByText(/^Precio$/i)).first();
    if (await tabPrecio.isVisible()) {
      await tabPrecio.click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(dir, '05-tab-precio.png') });
    }

    // Captura 6: Tab Galería
    const tabGaleria = page.getByRole('tab', { name: /galer/i }).or(page.getByText(/^Galería$/i)).first();
    if (await tabGaleria.isVisible()) {
      await tabGaleria.click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(dir, '06-tab-galeria.png') });
    }

    // Captura 7: Tab Paquetes
    const tabPaquetes = page.getByRole('tab', { name: /paquetes/i }).or(page.getByText(/^Paquetes$/i)).first();
    if (await tabPaquetes.isVisible()) {
      await tabPaquetes.click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(dir, '07-tab-paquetes.png') });
    }

    // 3. Regresar y ver el Detalle de un artículo existente
    await page.getByText(/^Artículos$/i).first().click();
    await page.waitForTimeout(3000);

    // Clic en la primera fila de la tabla
    const primeraFila = page.locator('tbody tr').first();
    if (await primeraFila.isVisible()) {
      await primeraFila.click();
      await page.waitForTimeout(2500);
      await page.screenshot({ path: path.join(dir, '08-detalle-articulo.png') });
    }

    console.log('¡Todas las capturas de pestañas y detalle fueron tomadas!');
  });
});
