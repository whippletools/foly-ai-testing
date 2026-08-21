import { test } from '@playwright/test';
test.use({ storageState: 'playwright/.auth/user.json' });

test('Estructura completa modal Roles', async ({ page }) => {
  await page.goto('/catalogos/roles', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  // Clic en botón Nuevo usando evaluate
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btnNuevo = btns.find(b => b.textContent?.trim().toLowerCase() === 'nuevo');
    if (btnNuevo) btnNuevo.click();
  });

  await page.waitForTimeout(2000);

  const modalText = await page.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"]') || document.querySelector('form') || document.body;
    return (dialog as HTMLElement).innerText;
  });

  console.log('--- MODAL TEXT EXACTO ---');
  console.log(modalText);
});
