import { test, expect } from '@playwright/test';

/**
 * FASE 1: Diagnóstico exploratorio del módulo Catálogos
 * Objetivo: Identificar submódulos, URLs, elementos UI y acceso
 */

test.describe('FASE 1: Diagnóstico manual - Catálogos', () => {
  test.use({ storageState: 'playwright/.auth/user.json' });

  test('Explorar módulo Catálogos - sidebar, submódulos y contenido', async ({ page }) => {
    await test.step('1. Navegar a página principal y hacer clic en Catálogos en sidebar', async () => {
      // Primero ir al dashboard para tener el sidebar cargado
      await page.goto('/solicitudes-credito', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(3000);
      
      // Hacer scroll en el sidebar para encontrar Catálogos
      await page.mouse.move(100, 500); // Posición aproximada del sidebar
      await page.mouse.wheel(0, 400); // Más scroll hacia abajo para encontrar Catálogos
      await page.waitForTimeout(1000);
      
      // Hacer clic en Catálogos usando coordenadas basadas en screenshot
      // Catálogos está más abajo después del scroll
      await page.mouse.click(100, 620); 
      await page.waitForTimeout(2000);
      
      // Hacer clic en Artículos usando JavaScript (más confiable que coordenadas)
      await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('*'));
        const articulos = elements.find(el => el.textContent?.trim() === 'Artículos');
        if (articulos) {
          (articulos as HTMLElement).click();
          console.log('Artículos clickeado');
        } else {
          console.log('Artículos no encontrado');
        }
      });
      await page.waitForTimeout(3000);
    });

    await test.step('2. Capturar screenshot general', async () => {
      await page.screenshot({ path: 'test-results/catalogos-general.png', fullPage: true });
    });

    await test.step('3. Identificar sidebar y submódulos', async () => {
      // Buscar elementos que parezcan menú o navegación
      const sidebarItems = await page.locator('nav, aside, [role="navigation"]').allTextContents();
      console.log('Sidebar items:', sidebarItems);
    });

    await test.step('4. Identificar título y header', async () => {
      const heading = await page.locator('h1, h2').first().textContent().catch(() => 'No heading found');
      console.log('Título/header:', heading);
    });

    await test.step('5. Identificar botones principales', async () => {
      const buttons = await page.getByRole('button').allTextContents();
      console.log('Botones:', buttons);
    });

    await test.step('6. Identificar tabs o filtros', async () => {
      const tabs = await page.getByRole('tab').allTextContents().catch(() => []);
      console.log('Tabs:', tabs);
    });

    await test.step('7. Identificar tabla o lista de items', async () => {
      const rows = await page.locator('table tbody tr, [role="listitem"], .MuiCard-root').count();
      console.log('Items visibles:', rows);
    });

    await test.step('8. Capturar URL final', async () => {
      console.log('URL final:', page.url());
    });
  });

  test('Explorar submódulos de Catálogos (navegación lateral)', async ({ page }) => {
    await test.step('1. Navegar a dashboard y luego clic en Catálogos', async () => {
      await page.goto('/solicitudes-credito', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(3000);
      
      // Buscar y hacer clic en "Catálogos" en toda la página
      const catalogosElement = page.locator('text=Catálogos').first();
      
      if (await catalogosElement.isVisible().catch(() => false)) {
        console.log('Encontrado Catálogos, haciendo clic...');
        await catalogosElement.click();
        await page.waitForTimeout(3000);
      } else {
        console.log('Catálogos no encontrado, buscando con alternativa...');
        const alternative = page.getByText('Catálogos', { exact: true }).first();
        if (await alternative.isVisible().catch(() => false)) {
          await alternative.click();
          await page.waitForTimeout(3000);
        }
      }
    });

    await test.step('2. Buscar y clickear submódulos visibles', async () => {
      // Buscar links o items de navegación que puedan ser submódulos
      const links = await page.locator('nav a, aside a, [role="navigation"] a').all();
      console.log('Links de navegación encontrados:', links.length);

      for (let i = 0; i < Math.min(links.length, 10); i++) {
        const text = await links[i].textContent().catch(() => 'unknown');
        const href = await links[i].getAttribute('href').catch(() => 'no href');
        console.log(`Link ${i}: ${text} -> ${href}`);
      }
    });

    await test.step('3. Screenshot de estructura completa', async () => {
      await page.screenshot({ path: 'test-results/catalogos-sidebar.png', fullPage: true });
    });
  });
});
