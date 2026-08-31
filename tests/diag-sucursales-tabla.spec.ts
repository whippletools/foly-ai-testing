import { test } from '@playwright/test';

test('Inspeccionar tabla de Sucursales detallada', async ({ page }) => {
  await page.goto('/catalogos/sucursales', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  const data = await page.evaluate(() => {
    const ths = Array.from(document.querySelectorAll('th')).map(th => th.textContent?.trim());
    const rows = Array.from(document.querySelectorAll('tbody tr')).map(tr => {
      const tds = Array.from(tr.querySelectorAll('td')).map(td => td.textContent?.trim().replace(/\s+/g, ' '));
      const btns = Array.from(tr.querySelectorAll('button, a, svg')).map(b => b.tagName + ' ' + (b.getAttribute('aria-label') || b.textContent?.trim()));
      return { tds, btns };
    });
    return { ths, rows: rows.slice(0, 3) };
  });

  console.log('DATOS SUCURSALES:', JSON.stringify(data, null, 2));
});
