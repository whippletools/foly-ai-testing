import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Capturar todas las pestañas visibles y vistas de Artículos', async ({ page }) => {
  const dir = path.resolve('manual-screenshots/articulos');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  // 1. Listado principal
  await page.goto('/catalogos/productos', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(dir, '01-listado-productos.png') });

  // 2. Ficha de detalle de un artículo existente
  const primeraFila = page.locator('tbody tr').first();
  if (await primeraFila.isVisible()) {
    await primeraFila.click();
    await page.waitForTimeout(2500);
    await page.screenshot({ path: path.join(dir, '02-ficha-detalle-articulo.png') });
  }

  // 3. Formulario Nuevo Artículo
  await page.goto('/catalogos/productos/nuevo', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  const nombresTabs = [
    'Datos generales',
    'Sucursales',
    'Proveedores',
    'Precio',
    'Galería',
    'Paquetes'
  ];

  for (let i = 0; i < nombresTabs.length; i++) {
    const nombre = nombresTabs[i];
    console.log(`Cambiando a pestaña: ${nombre}`);
    
    // Clic en la pestaña visible
    await page.evaluate((nombreTab) => {
      const tabs = Array.from(document.querySelectorAll('[role="tab"], button'));
      const target = tabs.find(t => t.textContent?.trim().toLowerCase() === nombreTab.toLowerCase());
      if (target) (target as HTMLElement).click();
    }, nombre);

    await page.waitForTimeout(1500);
    const filename = `03-tab-${i + 1}-${nombre.toLowerCase().replace(/[^a-z0-9]/g, '-')}.png`;
    await page.screenshot({ path: path.join(dir, filename) });
    console.log(`Captura guardada: ${filename}`);
  }

  console.log('¡Todas las 8 capturas exhaustivas listas!');
});
