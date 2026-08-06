import { test, expect } from '../fixtures/pages';

/**
 * Módulo: Clientes
 * Verifica que el link "Clientes" en el menú lateral sea visible
 * y navegue correctamente al módulo de clientes.
 */

test.describe('Módulo: Clientes', () => {
  test.use({ storageState: 'playwright/.auth/user.json' });

  test('Navegación al módulo Clientes', async ({ dashboardPage, page }) => {
    await test.step('1. Ir al dashboard', async () => {
      await dashboardPage.goto();
      await dashboardPage.expectLoaded();
    });

    await test.step('2. Verificar que el link "Clientes" está visible', async () => {
      await expect(dashboardPage.clientesLink).toBeVisible({ timeout: 10_000 });
    });

    await test.step('3. Clic en "Clientes" y verificar navegación', async () => {
      await dashboardPage.navigateToClientes();
      await page.waitForLoadState('networkidle');
      await page.screenshot({ path: 'test-results/clientes-modulo.png', fullPage: true });
    });
  });
});
