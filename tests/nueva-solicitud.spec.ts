import { test, expect } from '../fixtures/pages';

/**
 * Módulo: Nueva Solicitud de Crédito
 * Verifica que el link "Nueva solicitud" esté visible y navegable.
 */

test.describe('Módulo: Nueva Solicitud', () => {
  test.use({ storageState: 'playwright/.auth/user.json' });

  test('Verificar acceso al módulo desde el dashboard', async ({ dashboardPage, page }) => {
    await test.step('1. Navegar al dashboard con sesión activa', async () => {
      await dashboardPage.goto();
      await dashboardPage.expectLoaded();
    });

    await test.step('2. Verificar que "Nueva solicitud" está visible en el menú', async () => {
      await expect(dashboardPage.nuevaSolicitudLink).toBeVisible({ timeout: 10_000 });
    });

    await test.step('3. Clic en "Nueva solicitud" y verificar navegación', async () => {
      await dashboardPage.navigateToNuevaSolicitud();
      await page.waitForLoadState('networkidle');
      await page.screenshot({ path: 'test-results/nueva-solicitud-formulario.png', fullPage: true });
    });
  });
});
