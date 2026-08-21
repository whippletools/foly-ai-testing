import { test } from '@playwright/test';
test.use({ storageState: 'playwright/.auth/user.json' });

test('Extracción exacta y detallada de Roles', async ({ page }) => {
  await page.goto('/catalogos/roles', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  // Extraer texto completo visible de la página principal
  const textoPrincipal = await page.evaluate(() => document.body.innerText);
  console.log('--- TEXTO PRINCIPAL ROLES ---');
  console.log(textoPrincipal);

  // Buscar todos los botones
  const botones = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button, a, [role="button"]')).map(b => ({
      texto: b.textContent?.trim(),
      tag: b.tagName,
      id: b.id,
      className: b.className
    })).filter(b => b.texto);
  });
  console.log('--- BOTONES ENCONTRADOS ---', JSON.stringify(botones, null, 2));

  // Clic en el botón para agregar/editar rol
  const clickeado = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button, a'));
    const btnNuevo = btns.find(b => b.textContent?.toLowerCase().includes('nuevo') || b.textContent?.toLowerCase().includes('crear') || b.textContent?.toLowerCase().includes('agregar'));
    if (btnNuevo) {
      (btnNuevo as HTMLElement).click();
      return true;
    }
    // Si no hay botón nuevo, intentar con la primera fila de la tabla o botón de editar
    const btnEditar = btns.find(b => b.textContent?.toLowerCase().includes('editar') || b.querySelector('svg'));
    if (btnEditar) {
      (btnEditar as HTMLElement).click();
      return 'editar';
    }
    return false;
  });
  console.log('CLICKEADO:', clickeado);

  await page.waitForTimeout(2000);

  // Extraer contenido del modal/formulario abierto
  const detalleFormulario = await page.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"], .modal, form, [class*="modal"], [class*="dialog"]') || document.body;
    const labels = Array.from(dialog.querySelectorAll('label, p, span, h2, h3, h4, th, td')).map(l => l.textContent?.trim()).filter(Boolean);
    const inputs = Array.from(dialog.querySelectorAll('input, select, textarea')).map(i => ({
      tag: i.tagName,
      type: (i as HTMLInputElement).type,
      placeholder: (i as HTMLInputElement).placeholder,
      value: (i as HTMLInputElement).value,
      name: (i as HTMLInputElement).name,
      id: i.id,
      checked: (i as HTMLInputElement).checked
    }));
    return {
      textoDialog: (dialog as HTMLElement).innerText,
      labels: Array.from(new Set(labels)),
      inputs
    };
  });

  console.log('--- DETALLE FORMULARIO ---');
  console.log(JSON.stringify(detalleFormulario, null, 2));
});
