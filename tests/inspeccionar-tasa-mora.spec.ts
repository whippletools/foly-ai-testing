import { test } from '@playwright/test';
test.use({ storageState: 'playwright/.auth/user.json' });

test('Inspeccionar Tasa Mora y menú de Catálogos', async ({ page }) => {
  await page.goto('/catalogos/tasa-mora', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  // Tomar screenshot de la tabla/pantalla principal
  await page.screenshot({ path: 'test-results/tasa-mora-principal.png', fullPage: true });

  // Inspeccionar elementos de la página
  const info = await page.evaluate(() => {
    // Título y encabezados
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4')).map(h => h.textContent?.trim());
    
    // Botones disponibles
    const buttons = Array.from(document.querySelectorAll('button, a[role="button"]')).map(b => b.textContent?.trim()).filter(Boolean);
    
    // Columnas de tablas
    const ths = Array.from(document.querySelectorAll('th')).map(th => th.textContent?.trim()).filter(Boolean);
    
    // Inputs y selects
    const inputs = Array.from(document.querySelectorAll('input, select, textarea')).map(i => ({
      type: (i as HTMLInputElement).type,
      name: (i as HTMLInputElement).name,
      placeholder: (i as HTMLInputElement).placeholder,
      id: i.id
    }));

    // Links del menú lateral o barra de navegación para ver todos los submódulos de Catálogos
    const catalogLinks = Array.from(document.querySelectorAll('a[href*="catalogo"]')).map(a => ({
      text: a.textContent?.trim(),
      href: a.getAttribute('href')
    }));

    return { headings, buttons, ths, inputs, catalogLinks };
  });

  console.log('INFO_PAGINA:', JSON.stringify(info, null, 2));

  // Intentar abrir modal / formulario si hay botón "Nuevo"
  const clicked = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button, a'));
    const nuevoBtn = btns.find(b => b.textContent?.toLowerCase().includes('nuevo') || b.textContent?.toLowerCase().includes('agregar') || b.textContent?.toLowerCase().includes('crear'));
    if (nuevoBtn) {
      (nuevoBtn as HTMLElement).click();
      return true;
    }
    return false;
  });

  if (clicked) {
    await page.waitForTimeout(1500);
    await page.screenshot({ path: 'test-results/tasa-mora-formulario.png', fullPage: true });
    
    const formInfo = await page.evaluate(() => {
      const modal = document.querySelector('[role="dialog"], .modal, form, [class*="modal"], [class*="dialog"]');
      const labels = Array.from(document.querySelectorAll('label')).map(l => l.textContent?.trim()).filter(Boolean);
      const formInputs = Array.from(document.querySelectorAll('input, select, textarea')).map(i => ({
        tag: i.tagName,
        type: (i as HTMLInputElement).type,
        name: (i as HTMLInputElement).name,
        placeholder: (i as HTMLInputElement).placeholder,
        id: i.id
      }));
      const formButtons = Array.from(document.querySelectorAll('button')).map(b => b.textContent?.trim()).filter(Boolean);
      return { labels, formInputs, formButtons };
    });
    console.log('FORM_INFO:', JSON.stringify(formInfo, null, 2));
  }
});
