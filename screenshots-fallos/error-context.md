# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: solicitudes-credito.spec.ts >> Módulo: Solicitudes de Crédito >> Carga del módulo y tabla de solicitudes
- Location: tests/solicitudes-credito.spec.ts:13:7

# Error details

```
TimeoutError: page.goto: Timeout 15000ms exceeded.
Call log:
  - navigating to "https://erpfoly.vercel.app/solicitudes-credito", waiting until "networkidle"

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e5]:
    - img "foly" [ref=e7]
    - generic [ref=e8]:
      - heading "Ingresa a tu cuenta" [level=1] [ref=e9]
      - generic [ref=e10]:
        - generic [ref=e11]:
          - generic [ref=e12]: Número de empleado *
          - generic [ref=e13]:
            - img [ref=e15]
            - textbox "Número de empleado *" [active] [ref=e19]:
              - /placeholder: Ingresa tu número de empleado
            - group:
              - generic: Número de empleado *
        - generic [ref=e20]:
          - generic [ref=e21]: Ingresa tu contraseña *
          - generic [ref=e22]:
            - img [ref=e24]
            - textbox "Ingresa tu contraseña *" [ref=e27]:
              - /placeholder: Ingresa tu contraseña
            - button "Mostrar contraseña" [ref=e29] [cursor=pointer]:
              - img [ref=e30]
            - group:
              - generic: Ingresa tu contraseña *
        - button "Ingresar" [disabled]
      - generic [ref=e33]:
        - paragraph [ref=e34]: ¿Olvidaste tu contraseña?
        - link "Recuperar" [ref=e35] [cursor=pointer]:
          - /url: /login/recover
  - alert [ref=e36]
```

# Test source

```ts
  1   | import { type Page, type Locator, expect } from '@playwright/test';
  2   | 
  3   | /**
  4   |  * Page Object Model para el Dashboard de ERP Foly (post-login).
  5   |  *
  6   |  * Encapsula selectores del menú lateral, verificaciones de carga
  7   |  * y navegación por módulos. Extiende fácilmente para nuevos módulos.
  8   |  *
  9   |  * @see https://playwright.dev/docs/pom
  10  |  */
  11  | export class DashboardPage {
  12  |   readonly page: Page;
  13  | 
  14  |   /* --- Cabecera / Título --- */
  15  |   readonly heading: Locator;
  16  | 
  17  |   /* --- Tabla de solicitudes --- */
  18  |   readonly tableRows: Locator;
  19  |   readonly searchInput: Locator;
  20  |   readonly nuevaSolicitudButton: Locator;
  21  | 
  22  |   /* --- Menú lateral — links directos (no desplegables) --- */
  23  |   readonly nuevaSolicitudLink: Locator;
  24  |   readonly solicitudesCreditoLink: Locator;
  25  |   readonly ventasLink: Locator;
  26  |   readonly todasLasVentasLink: Locator; /* sub-item de Ventas */
  27  |   readonly ventasEnRojoLink: Locator;   /* sub-item de Ventas */
  28  |   readonly cotizacionesLink: Locator;
  29  |   readonly cajasLink: Locator;
  30  |   readonly clientesLink: Locator;
  31  |   readonly pedidosLink: Locator;
  32  |   readonly traspasosLink: Locator;
  33  |   readonly solicitudesDescuentoLink: Locator;
  34  |   readonly inventarioLink: Locator;
  35  |   readonly recepcionMercanciaLink: Locator;
  36  |   readonly atencionClienteLink: Locator;
  37  |   readonly rutasLink: Locator;
  38  |   readonly catalogosLink: Locator;
  39  | 
  40  |   constructor(page: Page) {
  41  |     this.page = page;
  42  | 
  43  |     /* Cabecera */
  44  |     this.heading = page.getByText('Solicitudes de crédito').first();
  45  | 
  46  |     /* Tabla */
  47  |     this.tableRows = page.locator('table tbody tr, [role="row"]').first();
  48  |     this.searchInput = page.locator('input[placeholder*="Buscar" i]').first();
  49  |     this.nuevaSolicitudButton = page.getByRole('button', { name: 'Nueva solicitud' });
  50  | 
  51  |     /* Links del menú lateral — regex case-insensitive para robustez */
  52  |     this.nuevaSolicitudLink = page.getByText(/Nueva solicitud/i).first();
  53  |     this.solicitudesCreditoLink = page.getByText(/Solicitudes de crédito/i).first();
  54  |     this.ventasLink = page.getByText(/Ventas/i).first();
  55  |     this.todasLasVentasLink = page.getByText(/Todas las ventas/i).first();
  56  |     this.ventasEnRojoLink = page.getByText(/Ventas en rojo/i).first();
  57  |     this.cotizacionesLink = page.getByText(/Cotizaciones guardadas/i).first();
  58  |     this.cajasLink = page.getByText(/Cajas/i).first();
  59  |     this.clientesLink = page.getByText(/Clientes/i).first();
  60  |     this.pedidosLink = page.getByText(/Pedidos/i).first();
  61  |     this.traspasosLink = page.getByText(/Traspasos/i).first();
  62  |     this.solicitudesDescuentoLink = page.getByText(/Solicitudes de descuento/i).first();
  63  |     this.inventarioLink = page.getByText(/Inventario/i).first();
  64  |     this.recepcionMercanciaLink = page.getByText(/Recepción de mercancía/i).first();
  65  |     this.atencionClienteLink = page.getByText(/Atención a cliente/i).first();
  66  |     this.rutasLink = page.getByText(/Rutas/i).first();
  67  |     this.catalogosLink = page.getByText(/Catálogos/i).first();
  68  |   }
  69  | 
  70  |   /**
  71  |    * Navega al dashboard de solicitudes de crédito.
  72  |    */
  73  |   async goto(): Promise<void> {
> 74  |     await this.page.goto('/solicitudes-credito', { waitUntil: 'networkidle' });
      |                     ^ TimeoutError: page.goto: Timeout 15000ms exceeded.
  75  |   }
  76  | 
  77  |   /**
  78  |    * Verifica que el dashboard haya cargado: título visible y tabla presente.
  79  |    */
  80  |   async expectLoaded(): Promise<void> {
  81  |     await expect(this.heading).toBeVisible({ timeout: 15_000 });
  82  |     await expect(this.tableRows).toBeVisible({ timeout: 15_000 });
  83  |   }
  84  | 
  85  |   /* ═══════════════════════════════════════════════════════
  86  |    *  Interacciones con la tabla de Solicitudes de Crédito
  87  |    *  ═══════════════════════════════════════════════════════ */
  88  | 
  89  |   async searchInTable(query: string): Promise<void> {
  90  |     await this.searchInput.fill(query);
  91  |     await this.page.keyboard.press('Enter');
  92  |     await this.page.waitForLoadState('networkidle');
  93  |   }
  94  | 
  95  |   async clickFirstRow(): Promise<void> {
  96  |     const firstRow = this.page.locator('table tbody tr').first();
  97  |     await firstRow.click();
  98  |     await this.page.waitForLoadState('networkidle');
  99  |   }
  100 | 
  101 |   async getRowCount(): Promise<number> {
  102 |     return this.page.locator('table tbody tr').count();
  103 |   }
  104 | 
  105 |   /* ═══════════════════════════════════════════════════════
  106 |    *  Navegación por módulos
  107 |    *  Cada método hace clic y espera la navegación.
  108 |    *  ═══════════════════════════════════════════════════════ */
  109 | 
  110 |   async navigateToNuevaSolicitud(): Promise<void> {
  111 |     await this.nuevaSolicitudLink.click();
  112 |   }
  113 | 
  114 |   async navigateToClientes(): Promise<void> {
  115 |     await this.clientesLink.click();
  116 |   }
  117 | 
  118 |   async navigateToInventario(): Promise<void> {
  119 |     await this.inventarioLink.click();
  120 |   }
  121 | 
  122 |   async navigateToCatalogos(): Promise<void> {
  123 |     await this.catalogosLink.click();
  124 |   }
  125 | 
  126 |   async navigateToVentas(): Promise<void> {
  127 |     /* Ventas es un menú expandible: primero expande, luego clickea sub-item */
  128 |     await this.ventasLink.click();
  129 |     await this.page.waitForTimeout(300);
  130 |     await this.todasLasVentasLink.click();
  131 |   }
  132 | 
  133 |   async navigateToPedidos(): Promise<void> {
  134 |     await this.pedidosLink.click();
  135 |   }
  136 | 
  137 |   async navigateToTraspasos(): Promise<void> {
  138 |     await this.traspasosLink.click();
  139 |   }
  140 | 
  141 |   async navigateToRutas(): Promise<void> {
  142 |     await this.rutasLink.click();
  143 |   }
  144 | }
  145 | 
```