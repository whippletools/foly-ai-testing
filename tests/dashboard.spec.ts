import { test, expect } from '../fixtures/pages';

/**
 * Módulo: Dashboard / Solicitudes de Crédito
 * Verifica que el dashboard cargue correctamente con sesión activa.
 */

test.describe('Módulo: Dashboard', () => {
  test.use({ storageState: 'playwright/.auth/user.json' });

  test('Carga del dashboard y tabla de solicitudes', async ({ dashboardPage, page }) => {
    await test.step('1. Navegar al dashboard', async () => {
      await dashboardPage.goto();
    });

    await test.step('2. Verificar título de página', async () => {
      await expect(dashboardPage.heading).toBeVisible({ timeout: 15_000 });
    });

    await test.step('3. Verificar tabla con datos', async () => {
      await expect(dashboardPage.tableRows).toBeVisible({ timeout: 15_000 });
    });

    await test.step('4. Screenshot de verificación', async () => {
      await page.screenshot({ path: 'test-results/dashboard-modulo.png', fullPage: true });
    });
  });
});
