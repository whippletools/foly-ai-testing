const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

async function run() {
  const dir = path.resolve(__dirname, '../manual-screenshots');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('1. Ingresando a login...');
  await page.goto('https://erpfoly.vercel.app/login', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Login
  const userInput = page.locator('input').first();
  await userInput.fill('6670000000');
  await page.locator('input[type="password"]').fill('123456');
  await page.getByRole('button', { name: /ingresar|iniciar/i }).click();
  await page.waitForTimeout(2000);

  // OTP
  const otpInput = page.getByPlaceholder(/código|6 dígitos/i).first();
  if (await otpInput.isVisible({ timeout: 5000 }).catch(() => false)) {
    console.log('Ingresando OTP...');
    await otpInput.fill('123456');
    await page.getByRole('button', { name: /validar/i }).click();
  }

  // Esperar a estar dentro del ERP (pantalla post-login)
  console.log('2. Esperando carga del sistema...');
  await page.waitForTimeout(4000);
  console.log('URL actual post-login:', page.url());

  // 3. Abrir menú Catálogos
  console.log('3. Clic en Catálogos en el sidebar...');
  const catalogosLink = page.getByText(/^Catálogos$/i).first();
  await catalogosLink.click();
  await page.waitForTimeout(1500);

  // 4. Clic en Artículos
  console.log('4. Clic en Artículos...');
  const articulosLink = page.getByText(/^Artículos$/i).first();
  await articulosLink.click();
  await page.waitForTimeout(3500);

  console.log('URL en Artículos:', page.url());
  const bodyText = await page.evaluate(() => document.body.innerText);
  console.log('Texto visible en pantalla (primeros 300 caracteres):', bodyText.slice(0, 300));

  // Screenshot 1: Tabla de Artículos
  const p1 = path.join(dir, 'articulos-listado.png');
  await page.screenshot({ path: p1, fullPage: false });
  console.log('Screenshot 1 guardado:', p1, 'Bytes:', fs.statSync(p1).size);

  // 5. Clic en botón Nuevo Artículo
  console.log('5. Clic en botón Nuevo...');
  const btnNuevo = page.getByRole('button', { name: /^Nuevo$/i }).first();
  if (await btnNuevo.isVisible()) {
    await btnNuevo.click();
  } else {
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button, a'));
      const b = btns.find(el => el.textContent && el.textContent.trim() === 'Nuevo');
      if (b) b.click();
    });
  }
  await page.waitForTimeout(3000);

  // Screenshot 2: Formulario Nuevo Artículo
  const p2 = path.join(dir, 'articulos-formulario.png');
  await page.screenshot({ path: p2, fullPage: false });
  console.log('Screenshot 2 guardado:', p2, 'Bytes:', fs.statSync(p2).size);

  await browser.close();
  console.log('¡Proceso finalizado correctamente!');
}

run().catch(console.error);
