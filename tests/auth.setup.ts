import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import * as fs from 'fs';
import * as path from 'path';

const authFile = 'playwright/.auth/user.json';

/**
 * Autenticación única (setup) que guarda el estado de sesión.
 * Todos los demás tests reutilizan este estado para no repetir login.
 *
 * @see https://playwright.dev/docs/auth#reuse-signed-in-state
 */
setup('authenticate', async ({ page }) => {
  /* Asegurar que el directorio de auth existe */
  const authDir = path.dirname(authFile);
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  const rawUser = process.env.FOLY_LOGIN_USER ?? '6670000000';
  const user = (rawUser.toLowerCase() === 'admin' ? '6670000000' : rawUser);
  const pass = process.env.FOLY_LOGIN_PASS ?? '123456';
  const otp = process.env.FOLY_LOGIN_OTP ?? '123456';

  if (!user || !pass || !otp) {
    throw new Error(
      'Faltan variables de entorno. ' +
      'Asegúrate de definir FOLY_LOGIN_USER, FOLY_LOGIN_PASS y FOLY_LOGIN_OTP en .env'
    );
  }

  const loginPage = new LoginPage(page);

  /* Login completo: credenciales + OTP */
  await loginPage.login(user, pass, otp);

  /* Esperar redirección al dashboard */
  await page.waitForURL(/\/solicitudes-credito|\/dashboard|\/catalogos/, { timeout: 30_000, waitUntil: 'domcontentloaded' });

  /* Guardar estado de sesión para reutilizar en otros tests */
  await page.context().storageState({ path: authFile });
});
