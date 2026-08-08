import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Cargar variables de entorno desde .env
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * Configuración profesional de Playwright para pruebas E2E de ERP Foly.
 *
 * Estructura:
 *   - setup: Autenticación única que guarda estado de sesión.
 *   - chromium / firefox / webkit: Tests funcionales que reutilizan la sesión.
 *
 * @see https://playwright.dev/docs/test-configuration
 * @see https://playwright.dev/docs/auth#reuse-signed-in-state
 */
export default defineConfig({
  testDir: './tests',
  outputDir: './test-results',

  /* Ejecutar tests en paralelo en CI, secuencial en local para evitar condiciones de carrera */
  fullyParallel: !!process.env.CI,
  workers: process.env.CI ? undefined : 1,

  /* Reintentos en CI, no en local para debugging rápido */
  retries: process.env.CI ? 2 : 0,

  /* Forzar que test.only() falle en CI */
  forbidOnly: !!process.env.CI,

  /* Reporter: HTML + line para CLI. En CI se puede agregar junit. */
  reporter: [
    ['html', { open: 'never' }],
    ['line'],
    ['allure-playwright', { detail: true, suiteTitle: false }],
  ],

  /* Timeouts globales */
  timeout: 60 * 1000, // 60s por test
  expect: {
    timeout: 15 * 1000, // 15s por expectación
  },

  use: {
    /* URL base de la aplicación */
    baseURL: process.env.BASE_URL || 'https://erpfoly.vercel.app',

    /* Timeouts de acción y navegación */
    actionTimeout: 10 * 1000,
    navigationTimeout: 15 * 1000,

    /* Collect artifacts */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    /* Viewport por defecto */
    viewport: { width: 1280, height: 720 },
  },

  projects: [
    /* Tests funcionales en Chromium (primero para UI mode) */
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
    /* Tests funcionales en Firefox */
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
    /* Tests funcionales en WebKit (Safari) */
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
    /*
     * Proyecto setup: ejecuta login una vez y guarda el estado de sesión.
     * Puesto al final para que no sea el default en UI mode.
     */
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});
