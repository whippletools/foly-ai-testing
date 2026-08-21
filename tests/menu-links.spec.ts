import { test } from '@playwright/test';
test.use({ storageState: 'playwright/.auth/user.json' });

test('Ver todos los enlaces del sidebar', async ({ page }) => {
  await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const menu = await page.evaluate(() => {
    const allLinks = Array.from(document.querySelectorAll('a')).map(a => ({
      text: a.innerText?.trim(),
      href: a.getAttribute('href')
    })).filter(a => a.href && !a.href.startsWith('javascript'));
    return allLinks;
  });

  console.log('TODOS_LOS_ENLACES:', JSON.stringify(menu, null, 2));
});
