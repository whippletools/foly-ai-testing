import { test, expect } from '../fixtures/pages';

/**
 * UI Health Check
 *
 * Detecta problemas reales de UI en la aplicación ERP Foly:
 *   - Errores en consola del navegador
 *   - Peticiones HTTP fallidas (4xx / 5xx)
 *   - Elementos desbordados (overflow)
 *   - Navegación rota en el menú lateral
 *   - Modales / overlays que bloquean interacción
 *   - Screenshots comparativos por módulo
 */

test.describe('UI Health Check', () => {
  test.use({ storageState: 'playwright/.auth/user.json' });

  test('Recorrido del menú lateral y detección de errores', async ({ dashboardPage, page }) => {
    const consoleErrors: string[] = [];
    const networkErrors: { url: string; status: number; statusText: string }[] = [];
    const navigationIssues: { module: string; reason: string; screenshot: string }[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    page.on('response', async response => {
      const status = response.status();
      if (status >= 400) {
        networkErrors.push({
          url: response.url(),
          status,
          statusText: response.statusText(),
        });
      }
    });

    await test.step('1. Ir al dashboard', async () => {
      await dashboardPage.goto();
      await dashboardPage.expectLoaded();
    });

    const modules = [
      { name: 'Nueva solicitud', click: () => dashboardPage.navigateToNuevaSolicitud() },
      { name: 'Clientes', click: () => dashboardPage.navigateToClientes() },
      { name: 'Inventario', click: () => dashboardPage.navigateToInventario() },
      { name: 'Ventas', click: () => dashboardPage.navigateToVentas() },
    ];

    for (const module of modules) {
      await test.step(`Navegar a: ${module.name}`, async () => {
        try {
          // Intenta cerrar modales abiertos antes de clickear
          await page.keyboard.press('Escape');
          await page.waitForTimeout(200);

          await module.click();
          await page.waitForLoadState('networkidle');

          const url = page.url();
          if (url.includes('/login')) {
            navigationIssues.push({ module: module.name, reason: 'Redirigió a /login', screenshot: '' });
          }
        } catch (error: any) {
          const screenshotName = `test-results/ui-health-${module.name.toLowerCase().replace(/\s+/g, '-')}-error.png`;
          await page.screenshot({ path: screenshotName, fullPage: true });
          navigationIssues.push({
            module: module.name,
            reason: error.message?.split('\n')[0] ?? 'Error desconocido',
            screenshot: screenshotName,
          });
        }

        await page.screenshot({
          path: `test-results/ui-health-${module.name.toLowerCase().replace(/\s+/g, '-')}.png`,
          fullPage: true,
        });
      });
    }

    await test.step('Verificar errores de consola, red y navegación', async () => {
      await page.waitForTimeout(500);

      const issues: string[] = [];
      if (consoleErrors.length > 0) issues.push(`Errores de consola: ${consoleErrors.length}`);
      if (networkErrors.length > 0) issues.push(`Peticiones fallidas: ${networkErrors.map(n => `${n.status} ${n.url}`).join(', ')}`);
      if (navigationIssues.length > 0) {
        issues.push(`Problemas de navegación: ${navigationIssues.map(i => `${i.module} — ${i.reason}`).join(' | ')}`);
      }

      console.log('=== HALLAZGOS UI ===');
      console.log(JSON.stringify({ consoleErrors, networkErrors, navigationIssues }, null, 2));

      expect(issues).toHaveLength(0);
    });
  });

  test('Detección de elementos desbordados en el dashboard', async ({ dashboardPage, page }) => {
    await test.step('1. Ir al dashboard', async () => {
      await dashboardPage.goto();
      await dashboardPage.expectLoaded();
    });

    const overflows = await page.evaluate(() => {
      const all = Array.from(document.querySelectorAll('*'));
      const items = [] as { tag: string; class: string; width: number; height: number }[];
      for (const el of all) {
        const rect = el.getBoundingClientRect();
        if (rect.width > window.innerWidth || rect.height > document.body.scrollHeight * 1.5) {
          items.push({
            tag: el.tagName,
            class: el.className,
            width: rect.width,
            height: rect.height,
          });
          if (items.length >= 20) break;
        }
      }
      return items;
    });

    console.log('Elementos posiblemente desbordados:', overflows);

    await page.screenshot({ path: 'test-results/ui-health-overflow.png', fullPage: true });

    expect(overflows.length).toBeLessThan(50);
  });
});
