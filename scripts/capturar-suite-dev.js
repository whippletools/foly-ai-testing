const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

async function updateScreenshots() {
  const BASE_URL = 'https://erpfoly-dev.vercel.app';
  const creditoDir = path.resolve(__dirname, '../manual-screenshots/solicitudes-credito');
  const ventasDir = path.resolve(__dirname, '../manual-screenshots/ventas');
  const clientesDir = path.resolve(__dirname, '../manual-screenshots/clientes');

  if (!fs.existsSync(clientesDir)) fs.mkdirSync(clientesDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('1. Iniciando sesión en dev...');
  await page.goto(`${BASE_URL}/login`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  await page.locator('input').first().fill('98765432');
  await page.locator('input[type="password"]').fill('Folysoft123');
  await page.getByRole('button', { name: /ingresar|iniciar/i }).click();
  await page.waitForTimeout(2500);

  const otpInput = page.getByPlaceholder(/código|6 dígitos/i).first();
  if (await otpInput.isVisible({ timeout: 5000 }).catch(() => false)) {
    await otpInput.fill('123456');
    await page.getByRole('button', { name: /validar/i }).click();
    await page.waitForTimeout(4500);
  }

  // --- A. Actualizar Solicitudes de Crédito ---
  console.log('2. Actualizando capturas de Solicitudes de crédito...');
  await page.goto(`${BASE_URL}/solicitudes-credito`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(creditoDir, '01-listado-solicitudes.png') });

  const btnNuevaSol = page.getByRole('button', { name: /nueva solicitud/i }).first();
  if (await btnNuevaSol.isVisible().catch(() => false)) {
    await btnNuevaSol.click();
    await page.waitForTimeout(2500);
    await page.screenshot({ path: path.join(creditoDir, '06-modal-nueva-solicitud-ine.png') });
    await page.keyboard.press('Escape');
    await page.waitForTimeout(1000);
  }

  // --- B. Actualizar Ventas ---
  console.log('3. Actualizando capturas de Ventas...');
  await page.goto(`${BASE_URL}/ventas`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(ventasDir, '01-punto-de-venta-inicial.png') });

  // --- C. Capturar Suite Completa de Clientes ---
  console.log('4. Capturando módulo de Clientes...');
  await page.goto(`${BASE_URL}/clientes`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3500);
  await page.screenshot({ path: path.join(clientesDir, '01-listado-clientes.png') });

  // Tab Activos
  const tabActivos = page.getByRole('button', { name: /^Activos/i }).or(page.getByText(/^Activos/i)).first();
  if (await tabActivos.isVisible()) {
    await tabActivos.click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(clientesDir, '02-tab-activos.png') });
  }

  // Tab Inactivos
  const tabInactivos = page.getByRole('button', { name: /^Inactivos/i }).or(page.getByText(/^Inactivos/i)).first();
  if (await tabInactivos.isVisible()) {
    await tabInactivos.click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(clientesDir, '03-tab-inactivos.png') });
  }

  // Tab Bloqueados
  const tabBloqueados = page.getByRole('button', { name: /^Bloqueados/i }).or(page.getByText(/^Bloqueados/i)).first();
  if (await tabBloqueados.isVisible()) {
    await tabBloqueados.click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(clientesDir, '04-tab-bloqueados.png') });
  }

  // Tab Todos y Búsqueda
  const tabTodos = page.getByRole('button', { name: /^Todos/i }).or(page.getByText(/^Todos/i)).first();
  if (await tabTodos.isVisible()) {
    await tabTodos.click();
    await page.waitForTimeout(1000);
  }

  const searchInput = page.getByPlaceholder(/buscar/i).first();
  if (await searchInput.isVisible()) {
    await searchInput.fill('Bryan');
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(clientesDir, '05-busqueda-filtrada-cliente.png') });
    await searchInput.fill('');
    await page.waitForTimeout(1000);
  }

  // Detalle de Cliente
  const primerCliente = page.locator('tbody tr').first();
  if (await primerCliente.isVisible()) {
    await primerCliente.click();
    await page.waitForTimeout(3000);
    await page.screenshot({ path: path.join(clientesDir, '06-detalle-cliente.png') });
    console.log('✓ Detalle Cliente capturado. URL:', page.url());
  }

  await browser.close();
  console.log('¡Todas las capturas actualizadas con éxito desde dev!');
}

updateScreenshots().catch(console.error);
