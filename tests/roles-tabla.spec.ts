import { test } from '@playwright/test';
test.use({ storageState: 'playwright/.auth/user.json' });

test('Detalle de Roles', async ({ page }) => {
  await page.goto('/catalogos/roles', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const tabla = await page.evaluate(() => {
    const ths = Array.from(document.querySelectorAll('th')).map(th => th.textContent?.trim());
    const filas = Array.from(document.querySelectorAll('tbody tr')).map(tr => 
      Array.from(tr.querySelectorAll('td')).map(td => td.textContent?.trim())
    );
    return { ths, filas: filas.slice(0, 5) };
  });

  console.log('TABLA_ROLES:', JSON.stringify(tabla, null, 2));

  // Clic en Nuevo Rol
  const btn = page.getByRole('button', { name: /nuevo|agregar|crear/i }).first();
  if (await btn.isVisible()) {
    await btn.click();
    await page.waitForTimeout(1000);
    const formGroups = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('form, [role="dialog"]')).map(f => (f as HTMLElement).innerText);
    });
    console.log('FORM_TEXT:', JSON.stringify(formGroups, null, 2));
  }
});
