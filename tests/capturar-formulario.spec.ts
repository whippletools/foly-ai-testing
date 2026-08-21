import { test } from '@playwright/test';
test.use({ storageState: 'playwright/.auth/user.json' });

const MODULOS = [
  { nombre: 'zonas', url: '/catalogos/zonas', archivo: 'formulario-zonas.png' },
  { nombre: 'cajas', url: '/catalogos/cajas', archivo: 'formulario-cajas.png' },
  { nombre: 'sucursales', url: '/catalogos/sucursales', archivo: 'formulario-sucursales.png' },
  { nombre: 'proveedores', url: '/catalogos/proveedores', archivo: 'formulario-proveedores.png' },
  { nombre: 'promociones', url: '/catalogos/promociones', archivo: 'formulario-promociones.png' },
  { nombre: 'proveedores-reparaciones', url: '/catalogos/proveedores-reparaciones', archivo: 'formulario-proveedores-reparaciones.png' },
  { nombre: 'departamentos', url: '/catalogos/departamentos', archivo: 'formulario-departamentos.png' },
  { nombre: 'articulos', url: '/catalogos/productos', archivo: 'formulario-articulos.png' },
];

for (const mod of MODULOS) {
  test(`Capturar formulario de ${mod.nombre}`, async ({ page }) => {
    await page.goto(mod.url, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);

    const botones = await page.evaluate(() => {
      const elementos = Array.from(document.querySelectorAll('button, a, [role="button"]'));
      return elementos
        .filter(el => el.textContent?.toLowerCase().includes('nuevo'))
        .map((el, i) => ({
          i,
          tag: el.tagName,
          text: el.textContent?.trim(),
          visible: (el as HTMLElement).offsetParent !== null,
        }));
    });

    if (botones.length === 0) {
      console.log(`No se encontró botón Nuevo en ${mod.nombre}`);
      await page.screenshot({ path: `test-results/${mod.archivo.replace('.png', '-error.png')}`, fullPage: true });
      return;
    }

    const idx = botones.findIndex(b => b.visible);
    const targetIdx = idx >= 0 ? idx : 0;

    await page.evaluate((index) => {
      const elementos = Array.from(document.querySelectorAll('button, a, [role="button"]'));
      const el = elementos.filter(e => e.textContent?.toLowerCase().includes('nuevo'))[index];
      if (el) {
        (el as HTMLElement).scrollIntoView({ block: 'center' });
        el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        el.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
        el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      }
    }, targetIdx);

    await page.waitForTimeout(2000);
    console.log(`Formulario de ${mod.nombre} capturado. URL: ${page.url()}`);
    await page.screenshot({ path: `test-results/${mod.archivo}`, fullPage: true });
  });
}
