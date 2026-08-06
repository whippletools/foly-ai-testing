import { test, expect } from '../fixtures/pages';

/**
 * Módulo: Ventas
 */

test.describe('Módulo: Ventas', () => {
  test.use({ storageState: 'playwright/.auth/user.json' });

  test('Navegación al módulo Ventas', async ({ dashboardPage, page }) => {
    await test.step('1. Ir al dashboard', async () => {
      await dashboardPage.goto();
      await dashboardPage.expectLoaded();
    });

    await test.step('2. Verificar link "Ventas" visible', async () => {
      await expect(dashboardPage.ventasLink).toBeVisible({ timeout: 10_000 });
    });

    await test.step('3. Clic en Ventas y screenshot', async () => {
      await dashboardPage.navigateToVentas();
      await page.waitForLoadState('networkidle');
      await page.screenshot({ path: 'test-results/ventas-modulo.png', fullPage: true });
    });
  });
});
