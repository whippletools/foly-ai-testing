import { test, expect } from '../fixtures/pages';

/**
 * Test E2E del flujo completo de autenticación en ERP Foly.
 *
 * Este test es independiente (no usa el auth.setup.ts) para poder
 * ejecutarse en UI mode y visualizar paso a paso el login.
 *
 * @see https://playwright.dev/docs/auth#reuse-signed-in-state
 */

test.describe('Login', () => {
  /* Limpiar storage state para forzar login desde cero */
  test.use({ storageState: { cookies: [], origins: [] } });

  test('Flujo completo: credenciales + OTP → Dashboard', async ({ loginPage, dashboardPage, page }) => {
    const user = process.env.FOLY_LOGIN_USER ?? '';
    const pass = process.env.FOLY_LOGIN_PASS ?? '';
    const otp = process.env.FOLY_LOGIN_OTP ?? '';

    if (!user || !pass || !otp) {
      throw new Error(
        'Faltan variables de entorno. Define FOLY_LOGIN_USER, FOLY_LOGIN_PASS y FOLY_LOGIN_OTP en .env'
      );
    }

    await test.step('1. Navegar a login', async () => {
      await loginPage.goto();
    });

    await test.step('2. Enviar credenciales y esperar OTP', async () => {
      await loginPage.submitCredentials(user, pass);
    });

    await test.step('3. Verificar paso de OTP visible', async () => {
      await loginPage.expectOtpStep();
    });

    await test.step('4. Enviar OTP y validar', async () => {
      await loginPage.submitOtp(otp);
    });

    await test.step('5. Esperar redirección al dashboard', async () => {
      await page.waitForURL(/\/solicitudes-credito/, { timeout: 30_000, waitUntil: 'networkidle' });
    });

    await test.step('6. Verificar dashboard cargado', async () => {
      await dashboardPage.expectLoaded();
    });
  });
});
