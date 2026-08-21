const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

async function capture() {
  const screenshotsDir = path.resolve(__dirname, '../manual-screenshots');
  if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('1. Iniciando sesión en ERP Foly...');
  await page.goto('https://erpfoly.vercel.app/login', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  const user = process.env.FOLY_LOGIN_USER || '6670000000';
  const pass = process.env.FOLY_LOGIN_PASS || '123456';

  await page.locator('input').first().fill(user);
  await page.locator('input[type="password"]').fill(pass);
  await page.getByRole('button', { name: /iniciar|entrar|login/i }).click();

  // Esperar campo OTP
  console.log('2. Esperando OTP...');
  await page.waitForSelector('input[type="text"]', { timeout: 15000 });
  await page.waitForTimeout(1000);

  const otp = process.env.FOLY_LOGIN_OTP || '1234';
  const otpInputs = page.locator('input');
  const count = await otpInputs.count();
  if (count >= 4) {
    for (let i = 0; i < 4; i++) {
      await otpInputs.nth(i).fill(otp[i] || '0');
    }
  } else {
    await otpInputs.first().fill(otp);
  }

  await page.waitForTimeout(3000);
  console.log('3. Sesión iniciada. Navegando a Catálogo de Artículos...');

  // Navegar a /catalogos/articulos
  await page.goto('https://erpfoly.vercel.app/catalogos/articulos', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(4000);

  // Screenshot 1: Listado
  const p1 = path.join(screenshotsDir, 'articulos-01-listado.png');
  await page.screenshot({ path: p1, fullPage: false });
  console.log('Screenshot 1 guardado (bytes):', fs.statSync(p1).size);

  // Click en botón Nuevo
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button, a'));
    const b = btns.find(el => el.textContent?.trim().toLowerCase() === 'nuevo');
    if (b) b.click();
  });
  await page.waitForTimeout(3000);

  // Screenshot 2: Formulario
  const p2 = path.join(screenshotsDir, 'articulos-02-formulario.png');
  await page.screenshot({ path: p2, fullPage: false });
  console.log('Screenshot 2 guardado (bytes):', fs.statSync(p2).size);

  await browser.close();
}

capture().catch(console.error);
