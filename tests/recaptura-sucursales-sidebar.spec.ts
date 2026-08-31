import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Capturar Sucursales navegando por sidebar con datos 100% cargados', async ({ page }) => {
  const dir = path.resolve('manual-screenshots/sucursales');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  // 1. Entrar por el dashboard y usar sidebar
  await page.goto('/solicitudes-credito', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  await page.getByText(/^Catálogos$/i).first().click();
  await page.waitForTimeout(1000);
  await page.getByText(/^Sucursales$/i).first().click();
  await page.waitForTimeout(4000);

  // Screenshot 1: Tabla de sucursales con datos reales
  const p1 = path.join(dir, '01-listado-sucursales-real.png');
  await page.screenshot({ path: p1 });
  console.log('Captura 1 lista:', p1);

  // Screenshot 2: Búsqueda con datos reales
  const searchInput = page.getByPlaceholder(/buscar/i).first();
  await searchInput.fill('Tampico');
  await page.waitForTimeout(1500);
  const p2 = path.join(dir, '02-busqueda-filtrada-real.png');
  await page.screenshot({ path: p2 });
  console.log('Captura 2 lista:', p2);

  await searchInput.fill('');
  await page.waitForTimeout(1000);

  // Screenshot 3: Pestaña Activas con datos reales
  await page.evaluate(() => {
    const tabs = Array.from(document.querySelectorAll('button, [role="tab"]'));
    const t = tabs.find(el => el.textContent?.trim() === 'Activas');
    if (t) (t as HTMLElement).click();
  });
  await page.waitForTimeout(1500);
  const p3 = path.join(dir, '03-filtro-activas-real.png');
  await page.screenshot({ path: p3 });
  console.log('Captura 3 lista:', p3);
});
