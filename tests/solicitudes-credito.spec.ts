import { test, expect } from '../fixtures/pages';

/**
 * Módulo: Solicitudes de Crédito (Dashboard principal post-login)
 *
 * Verifica la carga del módulo, la tabla de solicitudes,
 * la búsqueda y la interacción con filas.
 */

test.describe('Módulo: Solicitudes de Crédito', () => {
  test.use({ storageState: 'playwright/.auth/user.json' });

  test('Carga del módulo y tabla de solicitudes', async ({ dashboardPage, page }) => {
    await test.step('1. Navegar al módulo', async () => {
      await dashboardPage.goto();
      await dashboardPage.expectLoaded();
    });

    await test.step('2. Verificar título y tabla', async () => {
      await expect(dashboardPage.heading).toBeVisible();
      await expect(dashboardPage.tableRows).toBeVisible();
    });

    await test.step('3. Verificar que hay al menos una fila', async () => {
      const count = await dashboardPage.getRowCount();
      expect(count).toBeGreaterThan(0);
    });

    await test.step('4. Screenshot de verificación', async () => {
      await page.screenshot({ path: 'test-results/solicitudes-credito-carga.png', fullPage: true });
    });
  });

  test('Búsqueda en tabla de solicitudes', async ({ dashboardPage, page }) => {
    await test.step('1. Navegar al módulo', async () => {
      await dashboardPage.goto();
      await dashboardPage.expectLoaded();
    });

    await test.step('2. Verificar campo de búsqueda visible', async () => {
      await expect(dashboardPage.searchInput).toBeVisible({ timeout: 5_000 });
    });

    await test.step('3. Buscar y filtrar', async () => {
      await dashboardPage.searchInTable('test');
      await page.screenshot({ path: 'test-results/solicitudes-credito-busqueda.png', fullPage: true });
    });
  });

  test('Clic en primera fila para ver detalles', async ({ dashboardPage, page }) => {
    await test.step('1. Navegar al módulo', async () => {
      await dashboardPage.goto();
      await dashboardPage.expectLoaded();
    });

    await test.step('2. Hacer clic en primera fila', async () => {
      await dashboardPage.clickFirstRow();
      await page.screenshot({ path: 'test-results/solicitudes-credito-detalles.png', fullPage: true });
    });
  });
});
