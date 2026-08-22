const { chromium } = require('playwright');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

async function inspect() {
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

  const info = await page.evaluate(() => {
    const mainText = (document.querySelector('main') || document.body).innerText;
    const buttons = Array.from(document.querySelectorAll('button, a')).map(b => ({
      text: b.textContent?.trim(),
      href: b.getAttribute('href'),
      ariaLabel: b.getAttribute('aria-label')
    })).filter(b => b.text || b.ariaLabel);
    const tableHtml = document.querySelector('table')?.outerHTML;
    return { mainText, buttons, tableHtml };
  });

  console.log('ESTRUCTURA COMPLETA VENDEDORES:', JSON.stringify(info, null, 2));
  await browser.close();
}

inspect().catch(console.error);
