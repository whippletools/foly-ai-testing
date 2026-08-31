const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

async function run() {
  const dir = path.resolve(__dirname, '../manual-screenshots/vendedores');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  await page.goto('https://erpfoly.vercel.app/login', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const user = process.env.FOLY_LOGIN_USER === 'admin' ? '6670000000' : (process.env.FOLY_LOGIN_USER || '6670000000');
  const pass = process.env.FOLY_LOGIN_PASS || '123456';
  const otp = process.env.FOLY_LOGIN_OTP || '123456';

  await page.locator('input').first().fill(user);
  await page.locator('input[type="password"]').fill(pass);
  await page.getByRole('button', { name: /ingresar|iniciar/i }).click();
  await page.waitForTimeout(3000);

  const otpInput = page.getByPlaceholder(/código|6 dígitos/i).first();
  if (await otpInput.isVisible({ timeout: 5000 }).catch(() => false)) {
    await otpInput.fill(otp);
    await page.getByRole('button', { name: /validar/i }).click();
    await page.waitForTimeout(4000);
  }

  await page.goto('https://erpfoly.vercel.app/catalogos/vendedores');
  await page.waitForTimeout(4000);

  // 1. Captura Principal: Listado General
  await page.screenshot({ path: path.join(dir, '01-listado-vendedores.png') });
  console.log('Captura 1 lista (Listado Principal)');

  // 2. Probar Filtro de Sucursal / Select
  const selects = page.locator('.MuiSelect-select, [role="combobox"]');
  if (await selects.first().isVisible().catch(() => false)) {
    await selects.first().click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(dir, '02-filtro-sucursal-desplegado.png') });
    console.log('Captura 2 lista (Filtro Sucursal Desplegado)');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(1000);
  }

  // 3. Búsqueda por Nombre / Celular
  const searchInput = page.getByPlaceholder(/buscar/i).or(page.locator('input[type="text"]').first());
  if (await searchInput.isVisible().catch(() => false)) {
    await searchInput.fill('bryan');
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(dir, '03-busqueda-filtrada.png') });
    console.log('Captura 3 lista (Búsqueda Filtrada)');
    await searchInput.fill('');
    await page.waitForTimeout(1000);
  }

  // 4. Capturar Detalle / Fila / Click en Fila
  const row = page.locator('tbody tr').first();
  if (await row.isVisible().catch(() => false)) {
    await row.click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(dir, '04-seleccion-vendedor.png') });
    console.log('Captura 4 lista (Selección Vendedor)');
  }

  await browser.close();
  console.log('Capturas de Vendedores finalizadas.');
}

run().catch(console.error);
