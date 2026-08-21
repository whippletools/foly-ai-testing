import { test } from '@playwright/test';
test.use({ storageState: 'playwright/.auth/user.json' });

test('Listar todos los submódulos de Catálogos en el sidebar', async ({ page }) => {
  await page.goto('/catalogos/articulos', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Expandir menú Catálogos si no está expandido
  await page.evaluate(() => {
    const catalogBtn = Array.from(document.querySelectorAll('button, a')).find(el => el.textContent?.trim().toLowerCase() === 'catálogos' || el.textContent?.trim().toLowerCase() === 'catalogos');
    if (catalogBtn) (catalogBtn as HTMLElement).click();
  });
  await page.waitForTimeout(1000);

  const submodulos = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('nav a, aside a, [role="navigation"] a, a[href^="/catalogos"]'));
    return links.map(a => ({
      nombre: a.textContent?.trim(),
      url: a.getAttribute('href')
    })).filter(item => item.url && item.url.startsWith('/catalogos'));
  });

  console.log('TODOS_LOS_SUBMODULOS_CATALOGOS:', JSON.stringify(submodulos, null, 2));
});
