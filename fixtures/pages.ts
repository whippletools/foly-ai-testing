import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { PedidosPage } from '../pages/pedidos.page';

/**
 * Fixtures personalizadas que extienden el test base de Playwright.
 * Inyectan Page Objects automáticamente en cada test.
 *
 * Para agregar un nuevo POM:
 *   1. Importar la clase.
 *   2. Agregarla a TestFixtures.
 *   3. Agregar el fixture en base.extend().
 *
 * @see https://playwright.dev/docs/test-fixtures
 */
export type TestFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  pedidosPage: PedidosPage;
};

export const test = base.extend<TestFixtures>({
  /* Inyecta LoginPage automáticamente en cada test */
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  /* Inyecta DashboardPage automáticamente en cada test */
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  /* Inyecta PedidosPage automáticamente en cada test */
  pedidosPage: async ({ page }, use) => {
    await use(new PedidosPage(page));
  },
});

export { expect } from '@playwright/test';
