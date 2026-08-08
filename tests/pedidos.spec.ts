import { test, expect } from '../fixtures/pages';

/**
 * FASE 3: Automatización del flujo Pedidos
 *
 * Flujo documentado en: docs/flujo-pedidos.md
 *
 * Tests:
 * 1. Carga del módulo y verificación de lista
 * 2. Filtrar pedidos por estado (Recibidos)
 * 3. Ver detalle de un pedido (clic en primera card)
 * 4. Abrir formulario de "Nuevo pedido"
 *
 * @see docs/flujo-pedidos.md
 */

test.describe('Modulo: Pedidos', () => {
  test.use({ storageState: 'playwright/.auth/user.json' });

  test('Carga del modulo y lista de pedidos', async ({ pedidosPage, page }) => {
    await test.step('1. Navegar a /pedidos', async () => {
      await pedidosPage.goto();
    });

    await test.step('2. Verificar que cargo', async () => {
      await pedidosPage.expectLoaded();
    });

    await test.step('3. Verificar que hay pedidos visibles', async () => {
      await pedidosPage.expectPedidosVisible();
      const count = await pedidosPage.getCountPedidos();
      console.log(`Pedidos visibles: ${count}`);
    });

    await test.step('4. Screenshot de verificacion', async () => {
      await page.screenshot({ path: 'test-results/pedidos-carga.png', fullPage: true });
    });
  });

  test('Filtrar pedidos por estado Recibidos', async ({ pedidosPage, page }) => {
    await test.step('1. Navegar a pedidos', async () => {
      await pedidosPage.goto();
      await pedidosPage.expectLoaded();
    });

    await test.step('2. Clic en tab Recibidos', async () => {
      await pedidosPage.filtrarPorEstado('Recibidos');
    });

    await test.step('3. Verificar contenido filtrado', async () => {
      await page.screenshot({ path: 'test-results/pedidos-filtro-recibidos.png', fullPage: true });
    });
  });

  test('Filtrar pedidos por estado Solicitado', async ({ pedidosPage, page }) => {
    await test.step('1. Navegar a pedidos', async () => {
      await pedidosPage.goto();
      await pedidosPage.expectLoaded();
    });

    await test.step('2. Clic en tab Solicitado', async () => {
      await pedidosPage.filtrarPorEstado('Solicitado');
    });

    await test.step('3. Verificar contenido filtrado', async () => {
      await page.screenshot({ path: 'test-results/pedidos-filtro-solicitado.png', fullPage: true });
    });
  });

  test('Clic en primer pedido para ver detalle', async ({ pedidosPage, page }) => {
    await test.step('1. Navegar a pedidos', async () => {
      await pedidosPage.goto();
      await pedidosPage.expectLoaded();
    });

    await test.step('2. Clic en primer pedido', async () => {
      const nombrePedido = await pedidosPage.getNombrePrimerPedido();
      console.log(`Clic en pedido: ${nombrePedido}`);
      await pedidosPage.clickPrimerPedido();
    });

    await test.step('3. Capturar screenshot de detalle', async () => {
      await page.waitForTimeout(1000);
      await page.screenshot({ path: 'test-results/pedidos-detalle.png', fullPage: true });
      console.log(`URL despues de clic: ${page.url()}`);
    });
  });

  test('Abrir formulario Nuevo pedido', async ({ pedidosPage, page }) => {
    await test.step('1. Navegar a pedidos', async () => {
      await pedidosPage.goto();
      await pedidosPage.expectLoaded();
    });

    await test.step('2. Clic en Nuevo pedido', async () => {
      const result = await pedidosPage.clickNuevoPedido();
      console.log(`Modal: ${result.isModal}, URL: ${result.url}`);
    });

    await test.step('3. Screenshot del formulario/modal', async () => {
      await page.screenshot({ path: 'test-results/pedidos-nuevo-pedido.png', fullPage: true });
    });
  });
});
