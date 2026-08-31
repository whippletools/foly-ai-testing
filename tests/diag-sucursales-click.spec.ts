import { test } from '@playwright/test';

test('Diagnosticar elementos dentro de filas de Sucursales', async ({ page }) => {
  await page.goto('/catalogos/sucursales', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(4000);

  const info = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('tr')).map(r => ({
      text: r.innerText.replace(/\n/g, ' | '),
      html: r.innerHTML.slice(0, 150),
      buttons: Array.from(r.querySelectorAll('*')).filter(el => el.getAttribute('role') === 'button' || el.tagName === 'BUTTON' || el.tagName === 'SVG').map(b => b.outerHTML.slice(0, 100))
    }));
    return rows;
  });

  console.log('FILAS DETALLE:', JSON.stringify(info, null, 2));

  // Clic en la primera fila de datos
  const tr = page.locator('tbody tr').first();
  if (await tr.isVisible()) {
    await tr.click();
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'manual-screenshots/sucursales/04-clic-fila-sucursal.png' });
  }
});
