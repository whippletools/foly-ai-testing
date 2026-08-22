import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Capturar configuración de costos de envío con mapa y tarifas por municipio', async ({ page }) => {
  const dir = path.resolve('manual-screenshots/costos-envio');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  await page.goto('/catalogos/costos-envio', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  // 1. Pantalla Inicial (Selector de ciudad)
  await page.screenshot({ path: path.join(dir, '01-selector-ciudad-inicial.png') });

  // 2. Clic en el buscador de municipio y escribir "Tampico"
  const searchCity = page.getByPlaceholder(/buscar municipio/i).first();
  await searchCity.click();
  await searchCity.fill('Tampico');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(dir, '02-autocompletado-municipios.png') });

  // Seleccionar la opción de Tampico
  const optTampico = page.getByText(/Tampico/i).first();
  if (await optTampico.isVisible()) {
    await optTampico.click();
    await page.waitForTimeout(3000);
    await page.screenshot({ path: path.join(dir, '03-configuracion-zonas-tampico.png') });
  }

  // Ver los elementos que se abrieron
  const detallesCiudad = await page.evaluate(() => {
    return {
      text: document.body.innerText,
      inputs: Array.from(document.querySelectorAll('input, select, textarea')).map(i => ({
        placeholder: (i as HTMLInputElement).placeholder,
        value: (i as HTMLInputElement).value
      })),
      buttons: Array.from(document.querySelectorAll('button')).map(b => b.textContent?.trim()).filter(Boolean)
    };
  });
  console.log('DETALLES CIUDAD CARGADA:', JSON.stringify(detallesCiudad, null, 2));

  // 4. Probar otra ciudad como "Altamira"
  await searchCity.click();
  await searchCity.fill('Altamira');
  await page.waitForTimeout(1000);
  const optAltamira = page.getByText(/Altamira/i).first();
  if (await optAltamira.isVisible()) {
    await optAltamira.click();
    await page.waitForTimeout(2500);
    await page.screenshot({ path: path.join(dir, '04-configuracion-zonas-altamira.png') });
  }

  console.log('¡Capturas de Costos de Envío completadas!');
});
