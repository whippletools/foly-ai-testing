const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

async function run() {
  const dir = path.resolve(__dirname, '../manual-screenshots/hallazgos-plane');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const consoleLogs = [];
  const networkErrors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') consoleLogs.push(`[Console Error]: ${msg.text()}`);
  });

  page.on('response', resp => {
    if (resp.status() >= 400) {
      networkErrors.push(`[HTTP ${resp.status}]: ${resp.url()}`);
    }
  });

  console.log('1. Iniciando sesión...');
  await page.goto('https://erpfoly.vercel.app/login', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  await page.locator('input').first().fill('98765432');
  await page.locator('input[type="password"]').fill('Folysoft123');
  await page.getByRole('button', { name: 'Ingresar' }).click();
  await page.waitForTimeout(2500);

  const otpInput = page.getByPlaceholder('Ingresa el código de 6 dígitos');
  if (await otpInput.isVisible({ timeout: 6000 }).catch(() => false)) {
    console.log('Ingresando OTP...');
    await otpInput.fill('123456');
    await page.getByRole('button', { name: 'Validar' }).click();
    await page.waitForTimeout(5000);
  }

  console.log('URL tras login:', page.url());

  // ==========================================
  // HALLAZGO 1: Solicitudes de crédito - Modal INE sin feedback
  // ==========================================
  console.log('\n--- Re-analizando Hallazgo CRED-01 ---');
  await page.goto('https://erpfoly.vercel.app/solicitudes-credito', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(4000);

  const btnNueva = page.getByRole('button', { name: /nueva solicitud/i }).or(page.getByText('Nueva solicitud')).first();
  if (await btnNueva.isVisible()) {
    await btnNueva.click();
    await page.waitForTimeout(2500);

    // Capturar modal inicial donde el botón Siguiente está bloqueado sin instrucciones
    await page.screenshot({ path: path.join(dir, 'BUG-CRED-01-modal-ine-boton-deshabilitado.png') });
    console.log('✓ Captura BUG-CRED-01 generada');

    // Evaluar estado del botón y elementos del modal
    const cred01Analysis = await page.evaluate(() => {
      const dialog = document.querySelector('[role="dialog"]') || document.body;
      const btnSiguiente = Array.from(dialog.querySelectorAll('button')).find(b => b.textContent.includes('Siguiente'));
      return {
        modalTitle: dialog.querySelector('h1,h2,h3,h4,h5,p')?.textContent?.trim(),
        btnSiguienteDisabled: btnSiguiente ? btnSiguiente.disabled : null,
        visibleText: dialog.innerText
      };
    });
    console.log('Análisis CRED-01:', JSON.stringify(cred01Analysis, null, 2));

    await page.keyboard.press('Escape');
    await page.waitForTimeout(1500);
  }

  // ==========================================
  // HALLAZGO 2: Solicitudes de crédito - Datos vacíos / Guiones en listado
  // ==========================================
  console.log('\n--- Re-analizando Hallazgo CRED-02 ---');
  await page.screenshot({ path: path.join(dir, 'BUG-CRED-02-listado-solicitudes-campos-guion.png') });
  console.log('✓ Captura BUG-CRED-02 generada');

  // ==========================================
  // HALLAZGO 3: Ventas - Selector de cliente en POS
  // ==========================================
  console.log('\n--- Re-analizando Hallazgo VENT-01 ---');
  await page.goto('https://erpfoly.vercel.app/ventas/nueva', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3500);

  const clienteInput = page.getByPlaceholder('Buscar cliente').first();
  if (await clienteInput.isVisible()) {
    await clienteInput.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(dir, 'BUG-VENT-01-selector-cliente-sin-ayuda.png') });
    console.log('✓ Captura BUG-VENT-01 generada');
  }

  // ==========================================
  // HALLAZGO 4: Ventas - Cotizaciones guardadas sin cliente
  // ==========================================
  console.log('\n--- Re-analizando Hallazgo VENT-02 ---');
  await page.goto('https://erpfoly.vercel.app/cotizaciones-guardadas', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3500);
  await page.screenshot({ path: path.join(dir, 'BUG-VENT-02-cotizaciones-guardadas-sin-cliente.png') });
  console.log('✓ Captura BUG-VENT-02 generada');

  // ==========================================
  // HALLAZGO 5 (NUEVO RE-ANÁLISIS): Validación de envío en formulario de Venta vacía
  // ==========================================
  console.log('\n--- Analizando Posible Bug VENT-03 (Acciones en Venta vacía) ---');
  await page.goto('https://erpfoly.vercel.app/ventas/nueva', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  const btnRegistrarVenta = page.getByRole('button', { name: /registrar venta/i }).first();
  if (await btnRegistrarVenta.isVisible()) {
    console.log('Intentando clic en Registrar venta sin artículos ni cliente...');
    await btnRegistrarVenta.click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(dir, 'BUG-VENT-03-intento-registrar-venta-vacia.png') });
    console.log('✓ Captura BUG-VENT-03 generada');
  }

  // ==========================================
  // HALLAZGO 6 (NUEVO RE-ANÁLISIS): Revisión de Solicitud - Botones de dictamen
  // ==========================================
  console.log('\n--- Analizando Solicitudes de crédito (Revisión de solicitud ID 6) ---');
  await page.goto('https://erpfoly.vercel.app/solicitudes-credito/6/revision', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  const btnAdicional = page.getByRole('button', { name: /solicitar inf\. adicional/i }).first();
  if (await btnAdicional.isVisible()) {
    await btnAdicional.click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(dir, 'BUG-CRED-03-modal-solicitar-info-adicional.png') });
    console.log('✓ Captura Modal Solicitar Info Adicional generada');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(1000);
  }

  console.log('\n--- RESUMEN LOGS DE ERROR ---');
  console.log('Errores de consola detectados:', consoleLogs.length);
  console.log(consoleLogs.slice(0, 5));
  console.log('Errores de red detectados:', networkErrors.length);
  console.log(networkErrors.slice(0, 5));

  await browser.close();
  console.log('\n¡Re-análisis de hallazgos completado con éxito!');
}

run().catch(console.error);
