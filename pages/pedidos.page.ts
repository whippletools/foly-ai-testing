import { type Page, type Locator, expect } from '@playwright/test';

/**
 * Page Object Model para el modulo Pedidos de ERP Foly.
 *
 * Flujos soportados:
 * 1. Carga del modulo y verificacion de lista
 * 2. Filtrar pedidos por estado (Todos, Solicitado, En curso, Recibidos)
 * 3. Ver detalle de un pedido (clic en card)
 * 4. Crear nuevo pedido (clic en "Nuevo pedido")
 *
 * @see docs/flujo-pedidos.md
 */
export class PedidosPage {
  readonly page: Page;

  /* --- Header --- */
  readonly heading: Locator;
  readonly nuevoPedidoButton: Locator;

  /* --- Tabs de filtro --- */
  readonly tabTodos: Locator;
  readonly tabSolicitado: Locator;
  readonly tabEnCurso: Locator;
  readonly tabRecibidos: Locator;

  /* --- Lista de pedidos (cards) --- */
  readonly pedidoCards: Locator;
  readonly pedidoCardFirst: Locator;

  /* --- Estados de pedidos en cards --- */
  readonly badgeRecibido: Locator;
  readonly badgeSolicitado: Locator;

  constructor(page: Page) {
    this.page = page;

    /* Header */
    this.heading = page.getByText('Pedidos', { exact: true }).first();
    this.nuevoPedidoButton = page.getByRole('button', { name: 'Nuevo pedido' });

    /* Tabs - buscamos por texto exacto */
    this.tabTodos = page.getByRole('tab', { name: 'Todos' });
    this.tabSolicitado = page.getByRole('tab', { name: 'Solicitado' });
    this.tabEnCurso = page.getByRole('tab', { name: 'En curso' });
    this.tabRecibidos = page.getByRole('tab', { name: 'Recibidos' });

    /* Cards de pedidos - selector generico para cards/list items */
    this.pedidoCards = page.locator('[role="listitem"], .MuiCard-root, [class*="card" i]').or(
      page.locator('div').filter({ has: page.locator('text=/\\d+ artículos/i') }).first()
    );
    this.pedidoCardFirst = this.pedidoCards.first();

    /* Badges de estado */
    this.badgeRecibido = page.locator('text=Recibido');
    this.badgeSolicitado = page.locator('text=Solicitado');
  }

  /**
   * Navega directamente a /pedidos.
   */
  async goto(): Promise<void> {
    await this.page.goto('/pedidos', { waitUntil: 'domcontentloaded' });
    await this.page.waitForTimeout(2000); // Esperar carga de datos inicial
  }

  /**
   * Verifica que el modulo haya cargado: titulo visible y boton Nuevo pedido presente.
   */
  async expectLoaded(): Promise<void> {
    await expect(this.heading).toBeVisible({ timeout: 15_000 });
    await expect(this.nuevoPedidoButton).toBeVisible({ timeout: 10_000 });
  }

  /**
   * Filtra pedidos por estado.
   * @param estado - 'Todos' | 'Solicitado' | 'En curso' | 'Recibidos'
   */
  async filtrarPorEstado(estado: 'Todos' | 'Solicitado' | 'En curso' | 'Recibidos'): Promise<void> {
    const tabMap = {
      'Todos': this.tabTodos,
      'Solicitado': this.tabSolicitado,
      'En curso': this.tabEnCurso,
      'Recibidos': this.tabRecibidos,
    };

    const tab = tabMap[estado];
    if (!tab) {
      throw new Error(`Estado no valido: ${estado}. Use: Todos, Solicitado, En curso, Recibidos`);
    }

    await tab.click();
    await this.page.waitForTimeout(800); // Esperar transicion/animacion
  }

  /**
   * Clic en el boton "Nuevo pedido".
   * Retorna true si abrio un modal/formulario, false si navego a otra pagina.
   */
  async clickNuevoPedido(): Promise<{ isModal: boolean; url: string }> {
    const currentUrl = this.page.url();
    await this.nuevoPedidoButton.click();
    await this.page.waitForTimeout(1000);

    const newUrl = this.page.url();
    const hasModal = await this.page.locator('[role="dialog"], .MuiDialog-root, [class*="modal" i]').isVisible().catch(() => false);

    return {
      isModal: hasModal && newUrl === currentUrl,
      url: newUrl,
    };
  }

  /**
   * Clic en la primera card de pedido para ver detalle.
   */
  async clickPrimerPedido(): Promise<void> {
    await this.pedidoCardFirst.click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Obtiene el texto del primer pedido visible (nombre).
   */
  async getNombrePrimerPedido(): Promise<string> {
    return this.pedidoCardFirst.textContent().then(t => t?.split('\n')[0]?.trim() ?? '');
  }

  /**
   * Cuenta cuantos pedidos estan visibles en la lista.
   */
  async getCountPedidos(): Promise<number> {
    return this.pedidoCards.count();
  }

  /**
   * Verifica que haya al menos un pedido en la lista.
   */
  async expectPedidosVisible(): Promise<void> {
    const count = await this.getCountPedidos();
    if (count === 0) {
      throw new Error('No hay pedidos visibles en la lista');
    }
  }
}
