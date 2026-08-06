import { test, expect } from '../fixtures/pages';
import { DashboardPage } from '../pages/dashboard.page';

/**
 * Validación módulo por módulo del ERP Foly.
 *
 * Cada test:
 *   1. Navega al módulo vía menú lateral
 *   2. Verifica que no redirige a /login
 *   3. Espera carga de red
 *   4. Captura errores de consola y peticiones HTTP fallidas
 *   5. Toma screenshot de evidencia
 *   6. Verifica que la URL haya cambiado (indicando navegación real)
 */

test.describe('Validación por módulo', () => {
  test.use({ storageState: 'playwright/.auth/user.json' });

  const modules: { name: string; navigate: (d: DashboardPage) => Promise<void>; urlPattern: RegExp; titlePattern?: RegExp }[] = [
    { name: 'Nueva solicitud', navigate: d => d.navigateToNuevaSolicitud(), urlPattern: /nueva-solicitud/ },
    { name: 'Solicitudes de crédito', navigate: d => d.goto(), urlPattern: /solicitudes-credito/ },
    { name: 'Ventas', navigate: d => d.navigateToVentas(), urlPattern: /ventas/ }, /* menú expandible */
    { name: 'Cotizaciones guardadas', navigate: d => d.page.getByText(/Cotizaciones guardadas/i).first().click(), urlPattern: /cotizaciones/ },
    { name: 'Cajas', navigate: d => d.page.getByText(/Cajas/i).first().click(), urlPattern: /cajas/ },
    { name: 'Clientes', navigate: d => d.navigateToClientes(), urlPattern: /clientes/ },
    { name: 'Pedidos', navigate: d => d.navigateToPedidos(), urlPattern: /pedidos/ },
    { name: 'Traspasos', navigate: d => d.navigateToTraspasos(), urlPattern: /traspasos/ },
    { name: 'Solicitudes de descuento', navigate: d => d.page.getByText(/Solicitudes de descuento/i).first().click(), urlPattern: /descuento/ },
    { name: 'Inventario', navigate: d => d.navigateToInventario(), urlPattern: /inventario/ },
    { name: 'Recepción de mercancía', navigate: d => d.page.getByText(/Recepción de mercancía/i).first().click(), urlPattern: /recepcion/ },
    { name: 'Atención a cliente', navigate: d => d.page.getByText(/Atención a cliente/i).first().click(), urlPattern: /atencion/ },
    { name: 'Rutas', navigate: d => d.navigateToRutas(), urlPattern: /rutas/ },
    { name: 'Catálogos', navigate: d => d.navigateToCatalogos(), urlPattern: /catalogos/ },
  ];

  for (const mod of modules) {
    test(`Módulo: ${mod.name}`, async ({ dashboardPage, page }) => {
      const consoleErrors: string[] = [];
      const networkErrors: { url: string; status: number }[] = [];

      page.on('console', msg => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });

      page.on('response', async response => {
        const status = response.status();
        if (status >= 400) {
          networkErrors.push({ url: response.url(), status });
        }
      });

      await test.step('1. Ir al dashboard base', async () => {
        await dashboardPage.goto();
        await dashboardPage.expectLoaded();
      });

      await test.step(`2. Navegar a ${mod.name}`, async () => {
        // Cerrar cualquier modal abierto antes de navegar
        await page.keyboard.press('Escape');
        await page.waitForTimeout(200);

        await mod.navigate(dashboardPage);
        await page.waitForLoadState('networkidle');
      });

      await test.step('3. Verificar navegación', async () => {
        const url = page.url();
        expect(url).not.toContain('/login');
        expect(url).toMatch(mod.urlPattern);
      });

      await test.step('4. Capturar evidencia', async () => {
        await page.screenshot({
          path: `test-results/modulo-${mod.name.toLowerCase().replace(/\s+/g, '-')}.png`,
          fullPage: true,
        });
      });

      await test.step('5. Verificar errores', async () => {
        await page.waitForTimeout(500);
        expect.soft(consoleErrors, `Errores de consola en ${mod.name}`).toHaveLength(0);
        expect.soft(networkErrors, `Peticiones fallidas en ${mod.name}`).toHaveLength(0);
      });
    });
  }
});
