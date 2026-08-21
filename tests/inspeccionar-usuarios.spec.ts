import { test } from '@playwright/test';
test.use({ storageState: 'playwright/.auth/user.json' });

test('Inspeccionar Usuarios detallado', async ({ page }) => {
  await page.goto('/catalogos/usuarios', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  // 1. Extraer tabla y elementos principales
  const info = await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4')).map(h => h.textContent?.trim());
    const ths = Array.from(document.querySelectorAll('th')).map(th => th.textContent?.trim()).filter(Boolean);
    const buttons = Array.from(document.querySelectorAll('button')).map(b => b.textContent?.trim()).filter(Boolean);
    const searchInputs = Array.from(document.querySelectorAll('input')).map(i => ({
      placeholder: i.placeholder,
      type: i.type
    }));
    return { headings, ths, buttons, searchInputs };
  });

  console.log('--- INFO_USUARIOS ---', JSON.stringify(info, null, 2));

  // 2. Clic en botón Nuevo Usuario
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button, a'));
    const btn = btns.find(b => b.textContent?.trim().toLowerCase() === 'nuevo' || b.textContent?.trim().toLowerCase().includes('usuario'));
    if (btn) (btn as HTMLElement).click();
  });

  await page.waitForTimeout(2000);

  // 3. Extraer contenido del formulario
  const formInfo = await page.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"], form') || document.body;
    const labels = Array.from(dialog.querySelectorAll('label, p, span, h2, h3')).map(l => l.textContent?.trim()).filter(Boolean);
    const inputs = Array.from(dialog.querySelectorAll('input, select, textarea')).map(i => ({
      tag: i.tagName,
      type: (i as HTMLInputElement).type,
      placeholder: (i as HTMLInputElement).placeholder,
      name: (i as HTMLInputElement).name,
      id: i.id
    }));
    return {
      textoFormulario: (dialog as HTMLElement).innerText,
      labels: Array.from(new Set(labels)),
      inputs,
      currentUrl: window.location.pathname
    };
  });

  console.log('--- FORM_USUARIOS ---', JSON.stringify(formInfo, null, 2));
});
