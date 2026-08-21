const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function run() {
  const screenshotsDir = path.resolve(__dirname, '../manual-screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const storagePath = path.resolve(__dirname, '../playwright/.auth/user.json');
  
  const context = await browser.newContext({
    storageState: fs.existsSync(storagePath) ? storagePath : undefined,
    viewport: { width: 1440, height: 900 }
  });

  const page = await context.newPage();
  console.log('Navegando a /catalogos/articulos...');
  await page.goto('https://erpfoly.vercel.app/catalogos/articulos', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  // 1. Screenshot de tabla / listado de articulos
  const p1 = path.join(screenshotsDir, 'articulos-01-listado.png');
  await page.screenshot({ path: p1, fullPage: false });
  console.log('Guardado:', p1);

  // 2. Click en botón Nuevo
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button, a'));
    const btn = btns.find(b => b.textContent?.trim().toLowerCase() === 'nuevo' || b.textContent?.trim().toLowerCase().includes('artículo'));
    if (btn) btn.click();
  });
  await page.waitForTimeout(2000);

  // Screenshot de formulario
  const p2 = path.join(screenshotsDir, 'articulos-02-formulario.png');
  await page.screenshot({ path: p2, fullPage: false });
  console.log('Guardado:', p2);

  await browser.close();
  console.log('Completado con éxito!');
}

run().catch(console.error);
