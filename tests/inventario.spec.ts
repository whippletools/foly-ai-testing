import { test, expect } from '../fixtures/pages';

/**
 * Módulo: Inventario
 */

test.describe('Módulo: Inventario', () => {
  test.use({ storageState: 'playwright/.auth/user.json' });

  test('Navegación al módulo Inventario', async ({ dashboardPage, page }) => {
    await test.step('1. Ir al dashboard', async () => {
      await dashboardPage.goto();
      await dashboardPage.expectLoaded();
    });

    await test.step('2. Verificar link "Inventario" visible', async () => {
      await expect(dashboardPage.inventarioLink).toBeVisible({ timeout: 10_000 });
    });

    await test.step('3. Clic en Inventario y screenshot', async () => {
      await dashboardPage.navigateToInventario();
      await page.waitForLoadState('networkidle');
      await page.screenshot({ path: 'test-results/inventario-modulo.png', fullPage: true });
    });
  });
});
