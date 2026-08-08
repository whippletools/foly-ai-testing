import { test, expect } from '../fixtures/pages';

test.describe('FASE 1: Diagnostico manual - Modulo Pedidos', () => {
  test.use({ storageState: 'playwright/.auth/user.json' });

  test('Explorar UI de Pedidos', async ({ page }) => {
    await test.step('1. Navegar a /pedidos', async () => {
      await page.goto('/pedidos', { waitUntil: 'networkidle' });
      await page.waitForTimeout(1500);
    });

    await test.step('2. Capturar screenshot general', async () => {
      await page.screenshot({ path: 'test-results/pedidos-general.png', fullPage: true });
    });

    await test.step('3. Listar botones visibles', async () => {
      const buttons = await page.locator('button').all();
      const buttonInfo = await Promise.all(
        buttons.map(async (b, i) => {
          const text = await b.textContent().catch(() => '');
          const visible = await b.isVisible().catch(() => false);
          const disabled = await b.isDisabled().catch(() => false);
          return { index: i, text: text.trim(), visible, disabled };
        })
      );
      console.log('=== BOTONES ===');
      console.log(JSON.stringify(buttonInfo.filter(b => b.visible && b.text), null, 2));
    });

    await test.step('4. Listar inputs y campos de texto', async () => {
      const inputs = await page.locator('input, select, textarea').all();
      const inputInfo = await Promise.all(
        inputs.map(async (i, idx) => {
          const tag = await i.evaluate(el => el.tagName);
          const type = await i.getAttribute('type').catch(() => '');
          const placeholder = await i.getAttribute('placeholder').catch(() => '');
          const label = await i.getAttribute('aria-label').catch(() => '');
          const name = await i.getAttribute('name').catch(() => '');
          const visible = await i.isVisible().catch(() => false);
          return { index: idx, tag, type, placeholder, label, name, visible };
        })
      );
      console.log('=== INPUTS ===');
      console.log(JSON.stringify(inputInfo.filter(i => i.visible), null, 2));
    });

    await test.step('5. Listar tablas y filas', async () => {
      const tables = await page.locator('table').all();
      console.log(`Tablas encontradas: ${tables.length}`);
      for (let i = 0; i < tables.length; i++) {
        const rows = await tables[i].locator('tbody tr').count();
        const headers = await tables[i].locator('thead th, thead td').allTextContents();
        console.log(`  Tabla ${i}: ${rows} filas, headers: ${headers.join(' | ')}`);
      }
    });

    await test.step('6. Verificar titulo de pagina', async () => {
      const heading = await page.locator('h1, h2, h3').first().textContent().catch(() => 'No heading');
      console.log(`Titulo: ${heading}`);
      await expect(page).toHaveURL(/.*pedidos.*/);
    });

    await test.step('7. Capturar screenshot de tabla', async () => {
      const table = page.locator('table').first();
      if (await table.isVisible().catch(() => false)) {
        await table.screenshot({ path: 'test-results/pedidos-tabla.png' });
      }
    });
  });

  test('Flujo: Buscar en tabla de pedidos', async ({ page }) => {
    await test.step('1. Navegar a pedidos', async () => {
      await page.goto('/pedidos', { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000);
    });

    await test.step('2. Buscar un texto', async () => {
      const searchInput = page.locator('input[placeholder*="Buscar" i]').first();
      if (await searchInput.isVisible().catch(() => false)) {
        await searchInput.fill('test');
        await page.keyboard.press('Enter');
        await page.waitForTimeout(1500);
        await page.screenshot({ path: 'test-results/pedidos-busqueda.png', fullPage: true });
      } else {
        console.log('No se encontro campo de busqueda');
      }
    });
  });

  test('Flujo: Clic en primera fila', async ({ page }) => {
    await test.step('1. Navegar a pedidos', async () => {
      await page.goto('/pedidos', { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000);
    });

    await test.step('2. Clic en primera fila', async () => {
      const firstRow = page.locator('table tbody tr').first();
      if (await firstRow.isVisible().catch(() => false)) {
        await firstRow.click();
        await page.waitForTimeout(1500);
        await page.screenshot({ path: 'test-results/pedidos-detalle.png', fullPage: true });
        console.log(`URL despues de clic: ${page.url()}`);
      } else {
        console.log('No hay filas en la tabla');
      }
    });
  });
});
