# ERP Foly — Pruebas E2E con Playwright

Suite de pruebas end-to-end para la aplicación ERP Foly en [https://erpfoly.vercel.app](https://erpfoly.vercel.app).

## Estructura del proyecto

```
.
├── pages/               # Page Object Models (POM)
│   ├── login.page.ts    # POM de autenticación (credenciales + OTP)
│   └── dashboard.page.ts # POM del dashboard y módulos
├── fixtures/
│   └── pages.ts         # Fixtures personalizadas que inyectan POMs
├── tests/
│   ├── auth.setup.ts    # Setup: login único que guarda sesión
│   ├── login.spec.ts    # Test independiente del flujo completo de login
│   ├── dashboard.spec.ts
│   ├── nueva-solicitud.spec.ts
│   ├── clientes.spec.ts
│   ├── ventas.spec.ts
│   └── inventario.spec.ts
├── playwright.config.ts # Configuración profesional de Playwright
├── .env                 # Variables de entorno (no versionar)
└── tsconfig.json        # TypeScript
```

## Instalación

```bash
pnpm install
npx playwright install
```

## Configuración

Copia o edita `.env` con tus credenciales:

```env
FOLY_LOGIN_USER=tu_usuario
FOLY_LOGIN_PASS=tu_contraseña
FOLY_LOGIN_OTP=tu_codigo_otp
```

## Ejecución

### Todos los tests (con setup automático)

```bash
pnpm test
```

### Solo Chromium

```bash
pnpm test:chromium
```

### UI mode (visual, paso a paso)

```bash
pnpm test:ui
```

### Solo el test de login (independiente, no usa setup)

```bash
npx playwright test --project=chromium tests/login.spec.ts
```

### Ver reporte HTML

```bash
pnpm test:report
```

## Arquitectura

### Page Object Model (POM)

Cada página de la app tiene su POM en `pages/*.page.ts`. Los POM encapsulan:

- **Selectores** — `getByRole`, `getByText`, `getByPlaceholder` (robustos ante cambios de CSS)
- **Acciones** — `fill`, `click`, `goto`
- **Verificaciones** — `toBeVisible`, `toHaveURL`

### Fixtures personalizadas

Las fixtures en `fixtures/pages.ts` inyectan automáticamente los POM en cada test:

```typescript
import { test, expect } from '../fixtures/pages';

test('ejemplo', async ({ loginPage, dashboardPage }) => {
  await loginPage.goto();
  // ...
});
```

### Reutilización de sesión

1. `auth.setup.ts` ejecuta login **una vez** y guarda cookies/localStorage en `playwright/.auth/user.json`
2. Todos los tests de `chromium`, `firefox` y `webkit` reutilizan esa sesión vía `storageState`
3. `login.spec.ts` es **independiente** (no usa setup) para poder ejecutarse solo y visualizar el flujo completo

## Buenas prácticas aplicadas

- **No `waitForTimeout`** — se usan locators y `waitFor` nativos de Playwright
- **Selectores por rol/texto** — no dependen de clases CSS frágiles
- **Timeouts configurados** — `actionTimeout`, `navigationTimeout`, `expect.timeout`
- **Manejo de errores** — mensajes descriptivos cuando credenciales u OTP fallan
- **Screenshots y video** — automáticos en fallos
- **Trace** — captura en reintento para debugging

## Agregar un nuevo módulo

1. Agregar el selector y método de navegación en `pages/dashboard.page.ts`
2. Crear `tests/nuevo-modulo.spec.ts` usando `../fixtures/pages`
3. Ejecutar: `npx playwright test tests/nuevo-modulo.spec.ts`

## Referencias

- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Page Object Model](https://playwright.dev/docs/pom)
- [Test Fixtures](https://playwright.dev/docs/test-fixtures)
- [Auth / Reuse Signed-in State](https://playwright.dev/docs/auth#reuse-signed-in-state)
# Foly-Pruebas-_IU
