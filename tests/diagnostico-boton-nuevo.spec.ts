import { test } from '@playwright/test';
test.use({ storageState: 'playwright/.auth/user.json' });
test('Diagnostico boton Nuevo', async ({ page }) => {
  await page.goto('/catalogos/zonas', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);
  const botones = await page.evaluate(() => {
    const elementos = Array.from(document.querySelectorAll('button, a, [role="button"]'));
    return elementos
      .filter(el => el.textContent?.toLowerCase().includes('nuevo'))
      .map((el, i) => ({
        i,
        tag: el.tagName,
        text: el.textContent?.trim(),
        class: (el as HTMLElement).className,
        id: (el as HTMLElement).id,
        visible: (el as HTMLElement).offsetParent !== null,
        disabled: (el as HTMLButtonElement).disabled,
      }));
  });
  console.log('Botones:', JSON.stringify(botones, null, 2));
  if (botones.length > 0) {
    const idx = botones.findIndex(b => b.visible);
    const targetIdx = idx >= 0 ? idx : 0;
    await page.evaluate((index) => {
      const elementos = Array.from(document.querySelectorAll('button, a, [role="button"]'));
      const el = elementos.filter(e => e.textContent?.toLowerCase().includes('nuevo'))[index];
      if (el) {
        (el as HTMLElement).scrollIntoView({ block: 'center' });
        el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        el.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
        el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      }
    }, targetIdx);
    await page.waitForTimeout(2000);
    const modal = await page.locator('body').evaluate(() =>
      document.querySelectorAll('[role="dialog"], [data-modal], .modal, .ant-modal, .MuiDialog-root, .mantine-Modal-root').length
    );
    console.log('Modales:', modal, 'URL:', page.url());
  }
  await page.screenshot({ path: 'test-results/diagnostico-zonas.png', fullPage: true });
});
