const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function main() {
  const dir = path.resolve(__dirname, '../manual-screenshots');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const storageState = path.resolve(__dirname, '../playwright/.auth/user.json');
  console.log('Usando storageState:', storageState, 'Existe:', fs.existsSync(storageState));

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    storageState: fs.existsSync(storageState) ? storageState : undefined,
    viewport: { width: 1440, height: 900 }
  });

  const page = await context.newPage();
  
  // 1. Artículos
  console.log('1. Navegando a Artículos...');
  await page.goto('https://erpfoly.vercel.app/catalogos/articulos', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(4000);
  await page.screenshot({ path: path.join(dir, 'articulos-listado.png') });
  console.log('Artículos Listado bytes:', fs.statSync(path.join(dir, 'articulos-listado.png')).size);

  // Click Nuevo
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button, a'));
    const b = btns.find(el => el.textContent && el.textContent.trim().toLowerCase() === 'nuevo');
    if (b) b.click();
  });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(dir, 'articulos-formulario.png') });
  console.log('Artículos Formulario bytes:', fs.statSync(path.join(dir, 'articulos-formulario.png')).size);

  await browser.close();
}

main().catch(console.error);
