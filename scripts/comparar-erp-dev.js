const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

async function run() {
  const dir = path.resolve(__dirname, '../manual-screenshots/erp-dev-comparacion');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const BASE_URL = 'https://erpfoly-dev.vercel.app';
  const findings = {};

  console.log('1. Inspeccionando Pantalla de Login en:', `${BASE_URL}/login`);
  await page.goto(`${BASE_URL}/login`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);

  await page.screenshot({ path: path.join(dir, '01-login-dev.png') });

  const loginDetails = await page.evaluate(() => {
    return {
      title: document.title,
      headings: Array.from(document.querySelectorAll('h1, h2, h3, h4')).map(h => h.textContent.trim()),
      inputs: Array.from(document.querySelectorAll('input')).map(i => ({
        placeholder: i.placeholder,
        name: i.name,
        type: i.type,
        required: i.required
      })),
      buttons: Array.from(document.querySelectorAll('button')).map(b => b.textContent.trim()),
      texts: document.body.innerText.slice(0, 500)
    };
  });
  findings['login'] = loginDetails;

  // Iniciar sesión
  console.log('2. Iniciando sesión en dev...');
  const user = '98765432';
  const pass = 'Folysoft123';
  const otp = '123456';

  await page.locator('input').first().fill(user);
  await page.locator('input[type="password"]').fill(pass);
  await page.getByRole('button', { name: /ingresar|iniciar/i }).click();
  await page.waitForTimeout(2500);

  const otpInput = page.getByPlaceholder(/código|6 dígitos/i).first();
  if (await otpInput.isVisible({ timeout: 5000 }).catch(() => false)) {
    await page.screenshot({ path: path.join(dir, '02-otp-dev.png') });
    await otpInput.fill(otp);
    await page.getByRole('button', { name: /validar/i }).click();
    await page.waitForTimeout(4500);
  }

  console.log('URL tras login en dev:', page.url());

  // 3. Inspeccionar Sidebar y Módulos Generales
  const sidebarData = await page.evaluate(() => {
    const navItems = Array.from(document.querySelectorAll('nav a, nav button, [role="navigation"] a, ul li a')).map(el => el.textContent.trim()).filter(Boolean);
    const allLinks = Array.from(document.querySelectorAll('a')).map(a => ({ text: a.textContent.trim(), href: a.getAttribute('href') })).filter(a => a.href);
    const version = document.body.innerText.match(/V\.\d+\.\d+/i)?.[0] || 'No encontrada';
    const userProfile = document.body.innerText.match(/[A-Z]{2}\n[^\n]+\n\d{10}/)?.[0] || '';
    return { navItems, allLinks, version, userProfile };
  });
  findings['sidebar_global'] = sidebarData;

  // 4. Inspeccionar Solicitudes de Crédito
  console.log('4. Inspeccionando Solicitudes de crédito...');
  await page.goto(`${BASE_URL}/solicitudes-credito`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(dir, '03-solicitudes-credito-dev.png') });

  const creditoData = await page.evaluate(() => {
    return {
      title: document.querySelector('h1, h2, h3')?.textContent?.trim(),
      tabs: Array.from(document.querySelectorAll('button[role="tab"], .MuiTab-root')).map(t => t.textContent?.trim()),
      ths: Array.from(document.querySelectorAll('th')).map(th => th.textContent?.trim()),
      filasCount: document.querySelectorAll('tbody tr').length,
      buttons: Array.from(document.querySelectorAll('button')).map(b => b.textContent?.trim()).filter(Boolean)
    };
  });
  findings['solicitudes_credito'] = creditoData;

  // Probar abrir Nueva Solicitud (ver si cambió el modal INE)
  const btnNuevaSol = page.getByRole('button', { name: /nueva solicitud/i }).first();
  if (await btnNuevaSol.isVisible().catch(() => false)) {
    await btnNuevaSol.click();
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(dir, '04-modal-nueva-solicitud-dev.png') });
    
    const modalData = await page.evaluate(() => {
      const dialog = document.querySelector('[role="dialog"]') || document.body;
      return {
        text: dialog.innerText,
        buttons: Array.from(dialog.querySelectorAll('button')).map(b => ({ text: b.textContent.trim(), disabled: b.disabled }))
      };
    });
    findings['modal_nueva_solicitud'] = modalData;
    await page.keyboard.press('Escape');
    await page.waitForTimeout(1000);
  }

  // 5. Inspeccionar Ventas y POS
  console.log('5. Inspeccionando Ventas...');
  await page.goto(`${BASE_URL}/ventas`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(dir, '05-ventas-dev.png') });

  const ventasData = await page.evaluate(() => {
    return {
      title: document.querySelector('h1, h2, h3')?.textContent?.trim(),
      tabs: Array.from(document.querySelectorAll('button[role="tab"], .MuiTab-root')).map(t => t.textContent?.trim()),
      ths: Array.from(document.querySelectorAll('th')).map(th => th.textContent?.trim()),
      filasCount: document.querySelectorAll('tbody tr').length,
      buttons: Array.from(document.querySelectorAll('button')).map(b => b.textContent?.trim()).filter(Boolean)
    };
  });
  findings['ventas'] = ventasData;

  // POS / Nueva Venta
  await page.goto(`${BASE_URL}/ventas/nueva`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(dir, '06-ventas-nueva-pos-dev.png') });

  const posData = await page.evaluate(() => {
    return {
      text: document.body.innerText.slice(0, 800),
      buttons: Array.from(document.querySelectorAll('button')).map(b => b.textContent?.trim()).filter(Boolean),
      inputs: Array.from(document.querySelectorAll('input')).map(i => ({ placeholder: i.placeholder, name: i.name }))
    };
  });
  findings['pos_nueva_venta'] = posData;

  // 6. Inspeccionar Clientes
  console.log('6. Inspeccionando Clientes...');
  await page.goto(`${BASE_URL}/clientes`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(dir, '07-clientes-dev.png') });

  const clientesData = await page.evaluate(() => {
    return {
      title: document.querySelector('h1, h2, h3')?.textContent?.trim(),
      tabs: Array.from(document.querySelectorAll('button[role="tab"], .MuiTab-root')).map(t => t.textContent?.trim()),
      ths: Array.from(document.querySelectorAll('th')).map(th => th.textContent?.trim()),
      filasCount: document.querySelectorAll('tbody tr').length,
      buttons: Array.from(document.querySelectorAll('button')).map(b => b.textContent?.trim()).filter(Boolean),
      inputs: Array.from(document.querySelectorAll('input')).map(i => ({ placeholder: i.placeholder }))
    };
  });
  findings['clientes'] = clientesData;

  // 7. Inspeccionar Catálogos
  console.log('7. Inspeccionando Catálogos...');
  await page.goto(`${BASE_URL}/catalogos/articulos`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(dir, '08-catalogos-articulos-dev.png') });

  const catalogosData = await page.evaluate(() => {
    return {
      url: window.location.href,
      ths: Array.from(document.querySelectorAll('th')).map(th => th.textContent?.trim()),
      filasCount: document.querySelectorAll('tbody tr').length,
      buttons: Array.from(document.querySelectorAll('button')).map(b => b.textContent?.trim()).filter(Boolean)
    };
  });
  findings['catalogos_articulos'] = catalogosData;

  fs.writeFileSync(path.join(dir, 'comparacion_dev_results.json'), JSON.stringify(findings, null, 2));
  console.log('Resultados de inspección guardados en comparacion_dev_results.json');

  await browser.close();
}

run().catch(console.error);
