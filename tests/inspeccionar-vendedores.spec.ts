import { test } from '@playwright/test';
test.use({ storageState: 'playwright/.auth/user.json' });

test('Inspeccionar Vendedores exhaustivo', async ({ page }) => {
  await page.goto('/catalogos/vendedores', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  // 1. Extraer listado principal, encabezados de tabla, filas y botones
  const listadoInfo = await page.evaluate(() => {
    const title = document.querySelector('h1, h2')?.textContent?.trim();
    const ths = Array.from(document.querySelectorAll('th')).map(th => th.textContent?.trim());
    const filas = Array.from(document.querySelectorAll('tbody tr')).map(tr => 
      Array.from(tr.querySelectorAll('td')).map(td => td.textContent?.trim().replace(/\s+/g, ' '))
    );
    const botones = Array.from(document.querySelectorAll('button, a')).map(b => b.textContent?.trim()).filter(Boolean);
    const inputs = Array.from(document.querySelectorAll('input, select')).map(i => ({
      placeholder: (i as HTMLInputElement).placeholder,
      value: (i as HTMLInputElement).value,
      type: (i as HTMLInputElement).type
    }));
    return { title, ths, filas: filas.slice(0, 5), botones, inputs };
  });

  console.log('--- LISTADO_VENDEDORES ---', JSON.stringify(listadoInfo, null, 2));

  // 2. Clic en botón Nuevo Vendedor
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button, a'));
    const btn = btns.find(b => b.textContent?.trim().toLowerCase() === 'nuevo' || b.textContent?.trim().toLowerCase().includes('vendedor'));
    if (btn) (btn as HTMLElement).click();
  });

  await page.waitForTimeout(2500);

  // 3. Extraer formulario/modal completo
  const formInfo = await page.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"], form') || document.body;
    const labels = Array.from(dialog.querySelectorAll('label, p, span, h2, h3, h4')).map(l => l.textContent?.trim()).filter(Boolean);
    const formInputs = Array.from(dialog.querySelectorAll('input, select, textarea')).map(i => ({
      tag: i.tagName,
      type: (i as HTMLInputElement).type,
      placeholder: (i as HTMLInputElement).placeholder,
      value: (i as HTMLInputElement).value,
      name: (i as HTMLInputElement).name,
      id: i.id,
      checked: (i as HTMLInputElement).checked
    }));
    const formButtons = Array.from(dialog.querySelectorAll('button')).map(b => b.textContent?.trim()).filter(Boolean);

    return {
      currentUrl: window.location.pathname,
      textoCompleto: (dialog as HTMLElement).innerText,
      labels: Array.from(new Set(labels)),
      formInputs,
      formButtons
    };
  });

  console.log('--- FORM_VENDEDORES ---', JSON.stringify(formInfo, null, 2));
});
