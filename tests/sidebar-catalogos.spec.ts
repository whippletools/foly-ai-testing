import { test } from '@playwright/test';
test.use({ storageState: 'playwright/.auth/user.json' });

test('Capturar lista completa del sidebar de Catálogos', async ({ page }) => {
  await page.goto('/catalogos/articulos', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  // Extraer todos los textos del sidebar
  const items = await page.evaluate(() => {
    // Buscar elementos clicables o textos en la barra lateral
    const elements = Array.from(document.querySelectorAll('*'));
    return elements
      .map(el => el.textContent?.trim())
      .filter(t => t && t.length > 2 && t.length < 35);
  });

  // Filtrar únicos
  const uniqueItems = Array.from(new Set(items));
  console.log('ELEMENTOS_TEXTO_ENCONTRADOS:', JSON.stringify(uniqueItems.slice(0, 50), null, 2));
});
