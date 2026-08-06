import { type Page, type Locator, expect } from '@playwright/test';

/**
 * Page Object Model para el Dashboard de ERP Foly (post-login).
 *
 * Encapsula selectores del menú lateral, verificaciones de carga
 * y navegación por módulos. Extiende fácilmente para nuevos módulos.
 *
 * @see https://playwright.dev/docs/pom
 */
export class DashboardPage {
  readonly page: Page;

  /* --- Cabecera / Título --- */
  readonly heading: Locator;

  /* --- Tabla de solicitudes --- */
  readonly tableRows: Locator;
  readonly searchInput: Locator;
  readonly nuevaSolicitudButton: Locator;

  /* --- Menú lateral — links directos (no desplegables) --- */
  readonly nuevaSolicitudLink: Locator;
  readonly solicitudesCreditoLink: Locator;
  readonly ventasLink: Locator;
  readonly todasLasVentasLink: Locator; /* sub-item de Ventas */
  readonly ventasEnRojoLink: Locator;   /* sub-item de Ventas */
  readonly cotizacionesLink: Locator;
  readonly cajasLink: Locator;
  readonly clientesLink: Locator;
  readonly pedidosLink: Locator;
  readonly traspasosLink: Locator;
  readonly solicitudesDescuentoLink: Locator;
  readonly inventarioLink: Locator;
  readonly recepcionMercanciaLink: Locator;
  readonly atencionClienteLink: Locator;
  readonly rutasLink: Locator;
  readonly catalogosLink: Locator;

  constructor(page: Page) {
    this.page = page;

    /* Cabecera */
    this.heading = page.getByText('Solicitudes de crédito').first();

    /* Tabla */
    this.tableRows = page.locator('table tbody tr, [role="row"]').first();
    this.searchInput = page.locator('input[placeholder*="Buscar" i]').first();
    this.nuevaSolicitudButton = page.getByRole('button', { name: 'Nueva solicitud' });

    /* Links del menú lateral — regex case-insensitive para robustez */
    this.nuevaSolicitudLink = page.getByText(/Nueva solicitud/i).first();
    this.solicitudesCreditoLink = page.getByText(/Solicitudes de crédito/i).first();
    this.ventasLink = page.getByText(/Ventas/i).first();
    this.todasLasVentasLink = page.getByText(/Todas las ventas/i).first();
    this.ventasEnRojoLink = page.getByText(/Ventas en rojo/i).first();
    this.cotizacionesLink = page.getByText(/Cotizaciones guardadas/i).first();
    this.cajasLink = page.getByText(/Cajas/i).first();
    this.clientesLink = page.getByText(/Clientes/i).first();
    this.pedidosLink = page.getByText(/Pedidos/i).first();
    this.traspasosLink = page.getByText(/Traspasos/i).first();
    this.solicitudesDescuentoLink = page.getByText(/Solicitudes de descuento/i).first();
    this.inventarioLink = page.getByText(/Inventario/i).first();
    this.recepcionMercanciaLink = page.getByText(/Recepción de mercancía/i).first();
    this.atencionClienteLink = page.getByText(/Atención a cliente/i).first();
    this.rutasLink = page.getByText(/Rutas/i).first();
    this.catalogosLink = page.getByText(/Catálogos/i).first();
  }

  /**
   * Navega al dashboard de solicitudes de crédito.
   */
  async goto(): Promise<void> {
    await this.page.goto('/solicitudes-credito', { waitUntil: 'networkidle' });
  }

  /**
   * Verifica que el dashboard haya cargado: título visible y tabla presente.
   */
  async expectLoaded(): Promise<void> {
    await expect(this.heading).toBeVisible({ timeout: 15_000 });
    await expect(this.tableRows).toBeVisible({ timeout: 15_000 });
  }

  /* ═══════════════════════════════════════════════════════
   *  Interacciones con la tabla de Solicitudes de Crédito
   *  ═══════════════════════════════════════════════════════ */

  async searchInTable(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.page.keyboard.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  async clickFirstRow(): Promise<void> {
    const firstRow = this.page.locator('table tbody tr').first();
    await firstRow.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getRowCount(): Promise<number> {
    return this.page.locator('table tbody tr').count();
  }

  /* ═══════════════════════════════════════════════════════
   *  Navegación por módulos
   *  Cada método hace clic y espera la navegación.
   *  ═══════════════════════════════════════════════════════ */

  async navigateToNuevaSolicitud(): Promise<void> {
    await this.nuevaSolicitudLink.click();
  }

  async navigateToClientes(): Promise<void> {
    await this.clientesLink.click();
  }

  async navigateToInventario(): Promise<void> {
    await this.inventarioLink.click();
  }

  async navigateToCatalogos(): Promise<void> {
    await this.catalogosLink.click();
  }

  async navigateToVentas(): Promise<void> {
    /* Ventas es un menú expandible: primero expande, luego clickea sub-item */
    await this.ventasLink.click();
    await this.page.waitForTimeout(300);
    await this.todasLasVentasLink.click();
  }

  async navigateToPedidos(): Promise<void> {
    await this.pedidosLink.click();
  }

  async navigateToTraspasos(): Promise<void> {
    await this.traspasosLink.click();
  }

  async navigateToRutas(): Promise<void> {
    await this.rutasLink.click();
  }
}
