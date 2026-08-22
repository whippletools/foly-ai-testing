import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Capturar formulario completo de Proveedores con todas sus 3 pestañas', async ({ page }) => {
  const dir = path.resolve('manual-screenshots/proveedores');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  await page.goto('/solicitudes-credito', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Expandir Catálogos y entrar a Proveedores
  await page.getByText(/^Catálogos$/i).first().click();
  await page.waitForTimeout(1000);
  const subitemProveedores = page.locator('nav, aside, [role="navigation"]').getByText(/^Proveedores$/i).first();
  await subitemProveedores.click();
  await page.waitForTimeout(3000);

  // 1. Listado Principal
  await page.screenshot({ path: path.join(dir, '01-listado-proveedores.png') });

  // 2. Búsqueda
  const searchInput = page.getByPlaceholder(/buscar/i).first();
  if (await searchInput.isVisible()) {
    await searchInput.fill('Restonic');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(dir, '02-busqueda-filtrada.png') });
    await searchInput.fill('');
    await page.waitForTimeout(1000);
  }

  // 3. Menú de 3 puntos en la tabla
  const menuBtn = page.locator('tbody tr button').first();
  if (await menuBtn.isVisible()) {
    await menuBtn.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(dir, '03-menu-acciones-abierto.png') });
    await page.keyboard.press('Escape');
    await page.waitForTimeout(1000);
  }

  // 4. Ir a Nuevo Proveedor
  const btnNuevo = page.getByRole('button', { name: /^Nuevo$/i }).or(page.getByText(/^Nuevo/i)).first();
  await btnNuevo.click();
  await page.waitForTimeout(2500);

  // 4.1 Tab 1: Datos generales
  await page.screenshot({ path: path.join(dir, '04-tab-1-datos-generales.png') });

  // 4.2 Tab 2: Contactos
  const tabContactos = page.getByRole('tab', { name: /contactos/i }).or(page.getByText(/^Contactos$/i)).first();
  if (await tabContactos.isVisible()) {
    await tabContactos.click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(dir, '05-tab-2-contactos.png') });
  }

  // 4.3 Tab 3: Datos crediticios
  const tabCrediticios = page.getByRole('tab', { name: /datos crediticios/i }).or(page.getByText(/^Datos crediticios$/i)).first();
  if (await tabCrediticios.isVisible()) {
    await tabCrediticios.click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(dir, '06-tab-3-datos-crediticios.png') });
  }

  // 5. Clic en botón "Enviar invitación" o volver al listado
  await page.goto('/catalogos/proveedores', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  // 6. Clic en primera fila para ver detalle / edición de un proveedor existente
  const primeraFila = page.locator('tbody tr td').getByText(/Muebles del Pacífico|Restonic|Cocinas/i).first();
  if (await primeraFila.isVisible()) {
    await primeraFila.click();
    await page.waitForTimeout(2500);
    await page.screenshot({ path: path.join(dir, '07-detalle-edicion-proveedor.png') });
  }

  console.log('¡Todas las capturas exhaustivas de Proveedores listas!');
});
