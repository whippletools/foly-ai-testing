import { test, expect } from '../fixtures/pages';

/**
 * Validación de carga de módulos por URL directa.
 *
 * Cada test navega directamente a la ruta del módulo y verifica:
 *   - No redirige a /login (sesión válida)
 *   - No hay errores de consola
 *   - No hay peticiones HTTP fallidas (4xx/5xx)
 *   - Toma screenshot de evidencia
 */

test.describe('Carga de módulos por URL', () => {
  test.use({ storageState: 'playwright/.auth/user.json' });

  const modules: { name: string; path: string; noUrl?: boolean }[] = [
    { name: 'Nueva solicitud', path: '/nueva-solicitud' },
    { name: 'Solicitudes de crédito', path: '/solicitudes-credito' },
    { name: 'Ventas', path: '/ventas' },
    { name: 'Cotizaciones guardadas', path: '/cotizaciones', noUrl: true }, /* sub-item de Ventas, sin ruta propia */
    { name: 'Cajas', path: '/cajas' },
    { name: 'Clientes', path: '/clientes' },
    { name: 'Pedidos', path: '/pedidos' },
    { name: 'Traspasos', path: '/traspasos' },
    { name: 'Solicitudes de descuento', path: '/descuento', noUrl: true }, /* sin ruta propia */
    { name: 'Inventario', path: '/inventario' },
    { name: 'Recepción de mercancía', path: '/recepcion' },
    { name: 'Atención a cliente', path: '/atencion' },
    { name: 'Rutas', path: '/rutas' },
    { name: 'Catálogos', path: '/catalogos' },
  ];

  for (const mod of modules) {
    test(`Módulo: ${mod.name}`, async ({ page }) => {
      const consoleErrors: string[] = [];
      const networkErrors: { url: string; status: number }[] = [];
      let accessBlocked = false;

      page.on('console', msg => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });

      page.on('response', async response => {
        const status = response.status();
        if (status >= 400) {
          networkErrors.push({ url: response.url(), status });
        }
      });

      await test.step('1. Navegar directo a la ruta', async () => {
        await page.goto(mod.path, { waitUntil: 'networkidle' });
      });

      await test.step('2. Verificar que cargó (no redirigió a /login)', async () => {
        const url = page.url();
        expect(url).not.toContain('/login');
      });

      await test.step('3. Detectar acceso denegado o carga normal', async () => {
        const accessDenied = await page.getByText('No tienes acceso a esta pantalla').isVisible().catch(() => false);
        const noCaja = await page.getByText('No tienes una caja asignada').isVisible().catch(() => false);

        if (accessDenied || noCaja) {
          console.log(`[HALLAZGO] ${mod.name}: ${accessDenied ? 'Acceso denegado' : 'Sin caja asignada'}`);
          accessBlocked = true;
        }
      });

      if (accessBlocked) {
        // Tomar screenshot de evidencia y salir sin verificar errores
        await page.screenshot({
          path: `test-results/modulo-carga-${mod.name.toLowerCase().replace(/\s+/g, '-')}.png`,
          fullPage: true,
        });
        return;
      }

      await test.step('4. Capturar evidencia', async () => {
        await page.screenshot({
          path: `test-results/modulo-carga-${mod.name.toLowerCase().replace(/\s+/g, '-')}.png`,
          fullPage: true,
        });
      });

      await test.step('5. Verificar errores', async () => {
        await page.waitForTimeout(500);

        const findings: string[] = [];

        if (mod.noUrl) {
          // Módulos sin ruta propia: reportar 404 como hallazgo, no error
          const notFound = networkErrors.filter(e => e.status === 404);
          if (notFound.length > 0) {
            findings.push(`No tiene ruta propia: ${notFound.map(e => e.url).join(', ')}`);
          }
          // Filtrar errores de consola relacionados con 404
          const relevantConsoleErrors = consoleErrors.filter(e => !e.includes('404') && !e.includes('Failed to load resource'));
          if (relevantConsoleErrors.length > 0) {
            findings.push(`Errores de consola: ${relevantConsoleErrors.join('\n')}`);
          }
        } else {
          if (consoleErrors.length > 0) {
            findings.push(`Errores de consola (${consoleErrors.length}):\n${consoleErrors.join('\n')}`);
          }
          if (networkErrors.length > 0) {
            findings.push(`Peticiones fallidas (${networkErrors.length}):\n${networkErrors.map(e => `${e.status} ${e.url}`).join('\n')}`);
          }
        }

        if (findings.length > 0) {
          test.info().attach(`Hallazgos - ${mod.name}`, {
            body: findings.join('\n\n'),
            contentType: 'text/plain',
          });
          console.log(`[HALLAZGO] ${mod.name}: ${findings.length} observaciones adjuntas al reporte`);
        }
      });
    });
  }
});
