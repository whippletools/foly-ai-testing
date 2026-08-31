import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Re-capturar Sucursales esperando que la tabla cargue los datos reales', async ({ page }) => {
  const dir = path.resolve('manual-screenshots/sucursales');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  await page.goto('/catalogos/sucursales', { waitUntil: 'domcontentloaded' });

  // Esperar explícitamente a que desaparezcan los skeletons y aparezca el texto real de una sucursal
  console.log('Esperando que carguen los datos reales de sucursales...');
  await page.waitForSelector('text=Foly Muebles', { timeout: 20000 });
  await page.waitForTimeout(1500);

  // 1. Screenshot 1: Tabla con datos reales
  const p1 = path.join(dir, '01-listado-sucursales-real.png');
  await page.screenshot({ path: p1 });
  console.log('Captura 1 (Datos reales) guardada:', p1);

  // 2. Screenshot 2: Búsqueda dinámica con datos reales
  const searchInput = page.getByPlaceholder(/buscar/i).first();
  await searchInput.fill('Altamira');
  await page.waitForSelector('text=Altamira Centro', { timeout: 10000 });
  await page.waitForTimeout(1000);
  const p2 = path.join(dir, '02-busqueda-filtrada-real.png');
  await page.screenshot({ path: p2 });
  console.log('Captura 2 (Búsqueda real) guardada:', p2);

  await searchInput.fill('');
  await page.waitForTimeout(1000);

  // 3. Screenshot 3: Pestaña Activas con datos reales
  await page.evaluate(() => {
    const tabs = Array.from(document.querySelectorAll('button, [role="tab"]'));
    const t = tabs.find(el => el.textContent?.trim() === 'Activas');
    if (t) (t as HTMLElement).click();
  });
  await page.waitForTimeout(1500);
  const p3 = path.join(dir, '03-filtro-activas-real.png');
  await page.screenshot({ path: p3 });
  console.log('Captura 3 (Filtro Activas real) guardada:', p3);
});
