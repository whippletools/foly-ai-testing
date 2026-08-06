import { type Page, type Locator, expect } from '@playwright/test';

/**
 * Page Object Model para la página de login de ERP Foly.
 *
 * Encapsula selectores, acciones y verificaciones de la autenticación
 * (credenciales + OTP). Diseñado para ser reutilizado en tests y setup.
 *
 * @see https://playwright.dev/docs/pom
 */
export class LoginPage {
  readonly page: Page;

  /* --- Paso 1: Credenciales --- */
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  /* --- Paso 2: OTP --- */
  readonly otpInput: Locator;
  readonly validateButton: Locator;
  readonly otpHelperText: Locator;

  /* --- Errores --- */
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    /* Paso 1: Credenciales */
    this.usernameInput = page.getByRole('textbox', { name: 'Número de empleado *' });
    this.passwordInput = page.getByRole('textbox', { name: 'Ingresa tu contraseña *' });
    this.loginButton = page.getByRole('button', { name: 'Ingresar' });

    /* Paso 2: OTP — usa placeholder para evitar problemas con adornments de MUI */
    this.otpInput = page.getByPlaceholder('Ingresa el código de 6 dígitos');
    this.validateButton = page.getByRole('button', { name: 'Validar' });
    this.otpHelperText = page.getByText('Revisa el mensaje de WhatsApp que enviamos a tu teléfono');

    /* Errores: selector genérico que captura cualquier mensaje de error de login */
    this.errorMessage = page.getByText(/Ha ocurrido un error|Usuario y\/o contraseña no válidos/);
  }

  /**
   * Navega a /login y espera a que la red se estabilice.
   */
  async goto(): Promise<void> {
    await this.page.goto('/login', { waitUntil: 'networkidle' });
  }

  /**
   * Llena el formulario de credenciales y envía.
   * Espera a que aparezca el paso de OTP. Si aparece un error de credenciales,
   * falla inmediatamente con un mensaje descriptivo.
   */
  async submitCredentials(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();

    /*
     * Polling controlado: no deja promesas pendientes como Promise.race,
     * evitando timeouts fantasma en UI mode cuando el OTP aparece primero.
     */
    const deadline = Date.now() + 15_000;
    while (Date.now() < deadline) {
      if (await this.otpInput.isVisible().catch(() => false)) {
        return;
      }

      if (await this.errorMessage.isVisible().catch(() => false)) {
        const msg = (await this.errorMessage.textContent() ?? '').trim();
        throw new Error(
          `Login falló: ${msg || 'credenciales incorrectas'} para "${username}". ` +
          'Verifica FOLY_LOGIN_USER y FOLY_LOGIN_PASS en .env.'
        );
      }

      await this.page.waitForTimeout(200);
    }

    throw new Error(
      'No apareció el formulario OTP ni mensaje de error. ' +
      'Verifica credenciales y estado del servidor.'
    );
  }

  /**
   * Llena el código OTP y envía la validación.
   * Espera a que el spinner de carga desaparezca antes de retornar.
   */
  async submitOtp(otp: string): Promise<void> {
    await this.otpInput.fill(otp);
    await this.validateButton.click();

    /* Esperar a que el spinner de carga desaparezca */
    await this.page.waitForFunction(
      () => !document.querySelector(
        'button[type="submit"][disabled], .MuiLoadingButton-loading, .MuiCircularProgress-root'
      ),
      { timeout: 10_000 }
    );
  }

  /**
   * Flujo completo de autenticación: credenciales + OTP en una sola llamada.
   */
  async login(username: string, password: string, otp: string): Promise<void> {
    await this.goto();
    await this.submitCredentials(username, password);
    await this.submitOtp(otp);
  }

  /**
   * Verifica que el paso de OTP esté visible y muestre el mensaje de WhatsApp.
   */
  async expectOtpStep(): Promise<void> {
    await expect(this.otpInput).toBeVisible({ timeout: 15_000 });
    await expect(this.otpHelperText).toBeVisible({ timeout: 15_000 });
  }
}
