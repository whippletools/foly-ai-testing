import { test } from '@playwright/test';

test('Diagnóstico exacto de login en vivo', async ({ page }) => {
  await page.goto('/login', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Ver campos presentes
  const inputs = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('input, button')).map(el => ({
      tag: el.tagName,
      type: (el as HTMLInputElement).type,
      placeholder: (el as HTMLInputElement).placeholder,
      text: el.textContent?.trim(),
      name: (el as HTMLInputElement).name,
      id: el.id
    }));
  });
  console.log('Inputs & Buttons:', JSON.stringify(inputs, null, 2));

  // Llenar datos
  await page.locator('input').first().fill('6670000000');
  await page.locator('input[type="password"]').fill('123456');
  
  // Click en ingresar
  const btn = page.getByRole('button', { name: /ingresar|iniciar/i }).first();
  await btn.click();
  await page.waitForTimeout(4000);

  // Ver qué hay después del click
  const postClickText = await page.evaluate(() => document.body.innerText);
  console.log('--- TEXTO POST CLICK ---');
  console.log(postClickText);
});
