import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Diagnosticar y capturar exactamente la tabla con texto visible', async ({ page }) => {
  const dir = path.resolve('manual-screenshots/sucursales');

  // 1. Ir a la raíz y navegar por sidebar
  await page.goto('/solicitudes-credito', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  await page.getByText(/^Catálogos$/i).first().click();
  await page.waitForTimeout(1000);
  await page.getByText(/^Sucursales$/i).first().click();

  // Esperar a que el texto "Tampico Centro" aparezca en el DOM y sea visible
  console.log('Esperando selector Tampico Centro...');
  await page.getByText('Foly Muebles Tampico Centro').first().waitFor({ state: 'visible', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Verificar el texto de la tabla antes de la captura
  const textoTabla = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('tbody tr')).map(tr => (tr as HTMLElement).innerText.replace(/\n/g, ' '));
  });
  console.log('TEXTO REAL EN PANTALLA:', JSON.stringify(textoTabla, null, 2));

  // Tomar captura
  const p1 = path.join(dir, '01-listado-sucursales-poblado.png');
  await page.screenshot({ path: p1 });
  console.log('Captura guardada en:', p1);

  // Búsqueda
  const searchInput = page.getByPlaceholder(/buscar/i).first();
  await searchInput.fill('Altamira');
  await page.getByText('Foly Muebles Altamira').first().waitFor({ state: 'visible', timeout: 10000 });
  await page.waitForTimeout(1500);
  const p2 = path.join(dir, '02-busqueda-filtrada-poblada.png');
  await page.screenshot({ path: p2 });
  console.log('Captura búsqueda guardada:', p2);
});
