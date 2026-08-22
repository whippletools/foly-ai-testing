import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Capturar todas las vistas detalladas de Catálogo de Metas', async ({ page }) => {
  const dir = path.resolve('manual-screenshots/metas');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  await page.goto('/solicitudes-credito', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Expandir Catálogos y entrar a Metas
  await page.getByText(/^Catálogos$/i).first().click();
  await page.waitForTimeout(1000);
  const subitemMetas = page.locator('nav, aside, [role="navigation"]').getByText(/^Metas$/i).first();
  await subitemMetas.click();
  await page.waitForTimeout(3000);

  // 1. Matriz general de Metas
  await page.screenshot({ path: path.join(dir, '01-matriz-metas-general.png') });

  // 2. Llenar algunos valores de prueba para mostrar cómo se configuran las metas
  const inputs = page.locator('tbody tr input');
  const count = await inputs.count();
  if (count >= 4) {
    await inputs.nth(0).fill('50');
    await inputs.nth(1).fill('30');
    await inputs.nth(2).fill('120');
    await inputs.nth(3).fill('1500000');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(dir, '02-edicion-metas-sucursal.png') });
  }

  // 3. Ver selector de mes o botón de reporte
  const btnReporte = page.getByRole('button', { name: /descargar reporte|reporte/i }).or(page.getByText(/descargar reporte/i)).first();
  if (await btnReporte.isVisible()) {
    await page.screenshot({ path: path.join(dir, '03-cabecera-guardar-reporte.png') });
  }

  console.log('¡Todas las capturas de Metas listas!');
});
