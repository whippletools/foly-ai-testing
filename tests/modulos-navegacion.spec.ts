import { test, expect } from '../fixtures/pages';

/**
 * Validación de UI del menú lateral.
 *
 * Verifica que cada módulo aparezca visible en el menú.
 * No hace clicks reales (MUI/React requiere interacción específica de eventos).
 *
 * Los clicks y navegación ya están cubiertos por modulos-carga.spec.ts.
 */

test.describe('Menú lateral - UI', () => {
  test.use({ storageState: 'playwright/.auth/user.json' });

  const items = [
    'Nueva solicitud',
    'Solicitudes de crédito',
    'Ventas',
    'Cajas',
    'Clientes',
    'Pedidos',
    'Traspasos',
    'Solicitudes de descuento',
    'Inventario',
    'Atención a cliente',
    'Facturas',
    'Rutas',
    'Opciones contables',
    'Catálogos',
  ];

  test('Cargar dashboard y verificar menú visible', async ({ page }) => {
    await page.goto('/solicitudes-credito', { waitUntil: 'networkidle' });

    for (const item of items) {
      const locator = page.getByText(new RegExp(item, 'i'));
      await expect.soft(locator.first(), `Item de menú no visible: ${item}`).toBeVisible();
    }

    await page.screenshot({ path: 'test-results/menu-lateral.png', fullPage: true });
  });
});
