import { test } from '@playwright/test';
test.use({ storageState: 'playwright/.auth/user.json' });

test('Inspeccionar Roles', async ({ page }) => {
  await page.goto('/catalogos/roles', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  const info = await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4')).map(h => h.textContent?.trim());
    const buttons = Array.from(document.querySelectorAll('button, a[role="button"]')).map(b => b.textContent?.trim()).filter(Boolean);
    const ths = Array.from(document.querySelectorAll('th')).map(th => th.textContent?.trim()).filter(Boolean);
    const inputs = Array.from(document.querySelectorAll('input, select, textarea')).map(i => ({
      type: (i as HTMLInputElement).type,
      placeholder: (i as HTMLInputElement).placeholder,
      value: (i as HTMLInputElement).value
    }));
    const bodyText = document.body.innerText;

    return { headings, buttons, ths, inputs, textPreview: bodyText.slice(0, 1000) };
  });

  console.log('INFO_ROLES:', JSON.stringify(info, null, 2));

  // Intentar abrir modal de Nuevo Rol
  const nuevoBtn = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button, a'));
    const b = btns.find(el => el.textContent?.toLowerCase().includes('nuevo') || el.textContent?.toLowerCase().includes('agregar') || el.textContent?.toLowerCase().includes('crear'));
    if (b) {
      (b as HTMLElement).click();
      return true;
    }
    return false;
  });

  if (nuevoBtn) {
    await page.waitForTimeout(2000);
    const modalInfo = await page.evaluate(() => {
      const labels = Array.from(document.querySelectorAll('label')).map(l => l.textContent?.trim()).filter(Boolean);
      const modalInputs = Array.from(document.querySelectorAll('input, select, textarea')).map(i => ({
        placeholder: (i as HTMLInputElement).placeholder,
        type: (i as HTMLInputElement).type
      }));
      const modalButtons = Array.from(document.querySelectorAll('button')).map(b => b.textContent?.trim()).filter(Boolean);
      return { labels, modalInputs, modalButtons };
    });
    console.log('MODAL_ROLES:', JSON.stringify(modalInfo, null, 2));
  }
});
