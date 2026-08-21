import { test } from '@playwright/test';
test.use({ storageState: 'playwright/.auth/user.json' });

test('Capturar capturas de pantalla para Manual de Artículos', async ({ page }) => {
  // Ajustar viewport a tamaño estándar de escritorio
  await page.setViewportSize({ width: 1440, height: 900 });

  // 1. Vista de listado principal de Artículos
  await page.goto('/catalogos/productos', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  // Crear carpeta si no existe
  const fs = require('fs');
  if (!fs.existsSync('manual-screenshots')) {
    fs.mkdirSync('manual-screenshots', { recursive: true });
  }

  // Screenshot 1: Listado general
  await page.screenshot({ path: 'manual-screenshots/articulos-01-listado.png', fullPage: false });

  // 2. Abrir formulario de Nuevo Artículo
  const btnNuevo = page.getByRole('button', { name: /nuevo|agregar|crear/i }).first();
  if (await btnNuevo.isVisible()) {
    await btnNuevo.click();
    await page.waitForTimeout(2000);
    // Screenshot 2: Formulario de alta
    await page.screenshot({ path: 'manual-screenshots/articulos-02-formulario.png', fullPage: false });
  } else {
    // Probar buscar botón por texto con evaluate
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button, a'));
      const b = btns.find(el => el.textContent?.toLowerCase().includes('nuevo'));
      if (b) (b as HTMLElement).click();
    });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'manual-screenshots/articulos-02-formulario.png', fullPage: false });
  }
});
