import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Reautenticar y capturar Catálogos ahora que el sitio está arriba', async ({ page }) => {
  const dir = path.resolve('manual-screenshots');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  console.log('1. Navegando a Login...');
  await page.goto('/login', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Intentar login
  const userInput = page.getByRole('textbox', { name: /número de empleado|celular|usuario/i }).first();
  if (await userInput.isVisible()) {
    await userInput.fill('6670000000');
    await page.locator('input[type="password"]').fill('123456');
    await page.getByRole('button', { name: /ingresar|iniciar/i }).click();
    await page.waitForTimeout(2000);

    const otpInput = page.getByPlaceholder(/código|6 dígitos/i).first();
    if (await otpInput.isVisible()) {
      await otpInput.fill('123456');
      await page.getByRole('button', { name: /validar/i }).click();
      await page.waitForTimeout(3000);
    }
  }

  // Guardar nuevo auth state
  const authDir = path.resolve('playwright/.auth');
  if (!fs.existsSync(authDir)) fs.mkdirSync(authDir, { recursive: true });
  await page.context().storageState({ path: path.join(authDir, 'user.json') });

  // 2. Capturar Artículos
  console.log('2. Capturando Artículos...');
  await page.goto('/catalogos/articulos', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(dir, 'articulos-01-listado.png'), fullPage: false });

  // Abrir formulario
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button, a'));
    const b = btns.find(el => el.textContent?.trim().toLowerCase() === 'nuevo');
    if (b) (b as HTMLElement).click();
  });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: path.join(dir, 'articulos-02-formulario.png'), fullPage: false });

  console.log('Capturas tomadas exitosamente!');
});
