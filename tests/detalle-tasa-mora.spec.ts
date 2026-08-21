import { test } from '@playwright/test';
test.use({ storageState: 'playwright/.auth/user.json' });

test('Extraer texto completo de Tasa Mora', async ({ page }) => {
  await page.goto('/catalogos/tasa-mora', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const fullDetails = await page.evaluate(() => {
    const main = document.querySelector('main') || document.body;
    return {
      title: document.title,
      text: main.innerText,
      inputs: Array.from(document.querySelectorAll('input, select, textarea')).map(i => ({
        label: i.closest('div')?.querySelector('label')?.textContent?.trim() || 
               i.getAttribute('aria-label') || 
               (i as HTMLInputElement).placeholder,
        value: (i as HTMLInputElement).value,
        placeholder: (i as HTMLInputElement).placeholder,
        type: (i as HTMLInputElement).type
      })),
      buttons: Array.from(document.querySelectorAll('button')).map(b => b.innerText.trim()).filter(Boolean)
    };
  });

  console.log('FULL_DETAILS:', JSON.stringify(fullDetails, null, 2));
});
