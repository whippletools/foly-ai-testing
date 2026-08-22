import { test } from '@playwright/test';

test('Inspeccionar interfaz de Costos de envío', async ({ page }) => {
  await page.goto('/catalogos/costos-envio', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  const pageInfo = await page.evaluate(() => {
    return {
      title: document.title,
      h1: Array.from(document.querySelectorAll('h1, h2, h3')).map(h => h.textContent?.trim()),
      text: document.body.innerText,
      inputs: Array.from(document.querySelectorAll('input, select, textarea')).map(i => ({
        placeholder: (i as HTMLInputElement).placeholder,
        value: (i as HTMLInputElement).value,
        name: (i as HTMLInputElement).name,
        type: (i as HTMLInputElement).type
      })),
      buttons: Array.from(document.querySelectorAll('button')).map(b => b.textContent?.trim()).filter(Boolean)
    };
  });

  console.log('ESTRUCTURA COSTOS DE ENVIO:', JSON.stringify(pageInfo, null, 2));
});
