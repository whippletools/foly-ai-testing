const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

async function run() {
  const dir = path.resolve(__dirname, '../manual-screenshots/vendedores');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('1. Ingresando a login...');
  await page.goto('https://erpfoly.vercel.app/login', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Login
  const user = process.env.FOLY_LOGIN_USER === 'admin' ? '6670000000' : (process.env.FOLY_LOGIN_USER || '6670000000');
  const pass = process.env.FOLY_LOGIN_PASS || '123456';
  const otp = process.env.FOLY_LOGIN_OTP || '123456';

  console.log('Ingresando credenciales para usuario:', user);
  const userInput = page.locator('input').first();
  await userInput.fill(user);
  await page.locator('input[type="password"]').fill(pass);
  await page.getByRole('button', { name: /ingresar|iniciar/i }).click();
  await page.waitForTimeout(3000);

  // OTP
  const otpInput = page.getByPlaceholder(/código|6 dígitos/i).first();
  const hasOtp = await otpInput.isVisible({ timeout: 5000 }).catch(() => false);
  if (hasOtp) {
    console.log('Ingresando OTP...');
    await otpInput.fill(otp);
    await page.getByRole('button', { name: /validar/i }).click();
    await page.waitForTimeout(4000);
  }

  console.log('2. Esperando sistema post-login. URL:', page.url());
  await page.waitForTimeout(3000);

  // Navegar a /catalogos/vendedores
  console.log('3. Navegando a Catálogos > Vendedores...');
  try {
    const catBtn = page.getByText(/Catálogos/i).first();
    if (await catBtn.isVisible({ timeout: 4000 }).catch(() => false)) {
      await catBtn.click();
      await page.waitForTimeout(1000);
      const vBtn = page.getByText(/^Vendedores$/i).first();
      if (await vBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        await vBtn.click();
      } else {
        await page.goto('https://erpfoly.vercel.app/catalogos/vendedores');
      }
    } else {
      await page.goto('https://erpfoly.vercel.app/catalogos/vendedores');
    }
  } catch (e) {
    await page.goto('https://erpfoly.vercel.app/catalogos/vendedores');
  }
  await page.waitForTimeout(4000);

  console.log('URL actual en Vendedores:', page.url());

  // Captura 1: Listado General
  await page.screenshot({ path: path.join(dir, '01-listado-vendedores.png') });
  console.log('Captura 1 lista (Listado General)');

  // Extraer datos de la tabla
  const tablaData = await page.evaluate(() => {
    const title = document.querySelector('h1, h2')?.textContent?.trim();
    const ths = Array.from(document.querySelectorAll('th')).map(th => th.textContent?.trim());
    const filas = Array.from(document.querySelectorAll('tbody tr')).map(tr => 
      Array.from(tr.querySelectorAll('td')).map(td => td.textContent?.trim().replace(/\s+/g, ' '))
    );
    const tabs = Array.from(document.querySelectorAll('[role="tab"], .MuiTab-root, button')).map(t => t.textContent?.trim()).filter(Boolean);
    return { title, ths, filas: filas.slice(0, 5), tabs };
  });
  console.log('DATOS TABLA VENDEDORES:', JSON.stringify(tablaData, null, 2));

  // Captura 2: Búsqueda dinámica
  const searchInput = page.getByPlaceholder(/buscar/i).first();
  if (await searchInput.isVisible()) {
    await searchInput.fill('Admin');
    await page.waitForTimeout(1000);
    if ((await page.locator('tbody tr').count()) === 0) {
      // Intentar buscar una letra común
      await searchInput.fill('a');
      await page.waitForTimeout(1000);
    }
    await page.screenshot({ path: path.join(dir, '02-busqueda-filtrada.png') });
    console.log('Captura 2 lista (Búsqueda)');
    await searchInput.fill('');
    await page.waitForTimeout(1000);
  }

  // Captura 3: Tabs de Filtro si existen (Todos / Activos / Inactivos)
  const tabActivos = page.getByRole('button', { name: /^Activos$/i }).or(page.getByText(/^Activos$/i)).first();
  if (await tabActivos.isVisible({ timeout: 2000 }).catch(() => false)) {
    await tabActivos.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(dir, '03-filtro-activos.png') });
    console.log('Captura 3 lista (Filtro Activos)');
    const tabTodos = page.getByRole('button', { name: /^Todos$/i }).or(page.getByText(/^Todos$/i)).first();
    if (await tabTodos.isVisible()) await tabTodos.click();
    await page.waitForTimeout(1000);
  }

  // Captura 4: Formulario / Modal Nuevo Vendedor
  const btnNuevo = page.getByRole('button', { name: /nuevo vendedor|^nuevo$/i }).or(page.getByText(/Nuevo vendedor/i)).first();
  if (await btnNuevo.isVisible()) {
    await btnNuevo.click();
    await page.waitForTimeout(2500);
    await page.screenshot({ path: path.join(dir, '03-formulario-nuevo-vendedor.png') });
    console.log('Captura 4 lista (Formulario Nuevo Vendedor). URL:', page.url());

    const modalData = await page.evaluate(() => {
      const container = document.querySelector('[role="dialog"], form, main') || document.body;
      return {
        text: container.innerText?.slice(0, 500),
        labels: Array.from(container.querySelectorAll('label, legend, h2, h3, h4, p')).map(l => l.textContent?.trim()).filter(Boolean),
        inputs: Array.from(container.querySelectorAll('input, select, textarea')).map(i => ({
          placeholder: i.placeholder,
          name: i.name,
          type: i.type
        }))
      };
    });
    console.log('CAMPOS FORMULARIO NUEVO VENDEDOR:', JSON.stringify(modalData, null, 2));

    // Volver a la lista si navegó a otra ruta
    if (page.url().includes('/nuevo')) {
      await page.goto('https://erpfoly.vercel.app/catalogos/vendedores');
      await page.waitForTimeout(3000);
    } else {
      await page.keyboard.press('Escape');
      await page.waitForTimeout(1000);
    }
  }

  // Captura 5: Menú de Acciones (3 puntos)
  const actionButton = page.locator('tbody tr').first().locator('button, [aria-label*="action"], [aria-label*="más"], [aria-label*="menu"], svg').last();
  if (await actionButton.isVisible()) {
    await actionButton.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(dir, '04-menu-acciones.png') });
    console.log('Captura 5 lista (Menú de Acciones)');

    // Extraer opciones del menú
    const menuItems = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('[role="menuitem"], .MuiMenuItem-root, li, button')).map(el => el.textContent?.trim()).filter(Boolean);
    });
    console.log('OPCIONES MENU VENDEDORES:', JSON.stringify(menuItems));

    // Clic en Editar
    const editarOpt = page.getByRole('menuitem', { name: /editar/i }).or(page.getByText(/^Editar$/i)).first();
    if (await editarOpt.isVisible()) {
      await editarOpt.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(dir, '05-formulario-editar-vendedor.png') });
      console.log('Captura 6 lista (Formulario Editar Vendedor)');
      
      if (page.url().includes('/editar')) {
        await page.goto('https://erpfoly.vercel.app/catalogos/vendedores');
        await page.waitForTimeout(3000);
      } else {
        await page.keyboard.press('Escape');
        await page.waitForTimeout(1000);
      }
    }
  }

  // Captura 6: Confirmación Desactivar / Eliminar
  const actionButton2 = page.locator('tbody tr').first().locator('button, [aria-label*="action"], [aria-label*="más"], [aria-label*="menu"], svg').last();
  if (await actionButton2.isVisible()) {
    await actionButton2.click();
    await page.waitForTimeout(1000);
    const desactivarOpt = page.getByRole('menuitem', { name: /desactivar|inactivar|eliminar/i }).or(page.getByText(/desactivar|inactivar|eliminar/i)).first();
    if (await desactivarOpt.isVisible()) {
      await desactivarOpt.click();
      await page.waitForTimeout(1500);
      await page.screenshot({ path: path.join(dir, '06-dialogo-desactivar-vendedor.png') });
      console.log('Captura 7 lista (Diálogo Desactivar Vendedor)');
      await page.keyboard.press('Escape');
      await page.waitForTimeout(1000);
    }
  }

  console.log('¡Todas las capturas de Vendedores completadas exitosamente!');
  await browser.close();
}

run().catch(err => {
  console.error('Error al capturar Vendedores:', err);
  process.exit(1);
});
