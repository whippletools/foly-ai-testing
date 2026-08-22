import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Capturar todas las vistas completas de Costos de Envío con mapa y tarifas', async ({ page }) => {
  const dir = path.resolve('manual-screenshots/costos-envio');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  await page.goto('/catalogos/costos-envio', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  // 1. Pantalla Inicial
  await page.screenshot({ path: path.join(dir, '01-pantalla-inicial-seleccion-ciudad.png') });

  // 2. Búsqueda y selección de Tampico
  const searchCity = page.getByPlaceholder(/buscar municipio/i).first();
  await searchCity.fill('Tampico');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(dir, '02-buscador-autocompletado-ciudad.png') });

  const optTampico = page.getByText(/Tampico \(Tamaulipas\)/i).first();
  if (await optTampico.isVisible()) {
    await optTampico.click();
    await page.waitForTimeout(3000);
  }

  // 3. Vista de Configuración de Tarifas y Mapa
  await page.screenshot({ path: path.join(dir, '03-mapa-y-tarifas-municipio.png') });

  // 4. Edición de tarifas dentro y fuera de zona
  const inputsTarifas = page.locator('input[type="text"], input[type="number"]');
  const count = await inputsTarifas.count();
  if (count >= 3) {
    await inputsTarifas.nth(1).fill('150.00');
    await inputsTarifas.nth(2).fill('450.00');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(dir, '04-edicion-tarifas-dentro-fuera-zona.png') });
  }

  // 5. Clic en botón "Nueva" zona sobre el mapa
  const btnNuevaZona = page.getByRole('button', { name: /^Nueva$/i }).first();
  if (await btnNuevaZona.isVisible()) {
    await btnNuevaZona.click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(dir, '05-trazado-nueva-zona-mapa.png') });
  }

  console.log('¡Todas las capturas de Costos de Envío listas!');
});
