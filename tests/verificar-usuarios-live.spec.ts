import { test } from '@playwright/test';
test.use({ storageState: 'playwright/.auth/user.json' });

test('Verificar tabla exacta de Usuarios en vivo', async ({ page }) => {
  await page.goto('/catalogos/usuarios', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  // 1. Tomar screenshot
  await page.screenshot({ path: 'test-results/usuarios-live.png', fullPage: true });

  // 2. Extraer todo el texto de la tabla y controles
  const liveData = await page.evaluate(() => {
    const title = document.querySelector('h1, h2')?.textContent?.trim();
    const ths = Array.from(document.querySelectorAll('th')).map(th => th.textContent?.trim());
    const filas = Array.from(document.querySelectorAll('tbody tr')).map(tr => 
      Array.from(tr.querySelectorAll('td')).map(td => td.textContent?.trim().replace(/\s+/g, ' '))
    );
    const filtros = Array.from(document.querySelectorAll('input, select')).map(i => ({
      placeholder: (i as HTMLInputElement).placeholder,
      value: (i as HTMLInputElement).value
    }));
    return { title, ths, filas: filas.slice(0, 5), filtros };
  });

  console.log('--- DATOS EN VIVO USUARIOS ---');
  console.log(JSON.stringify(liveData, null, 2));
});
