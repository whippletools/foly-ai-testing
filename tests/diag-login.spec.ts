import { test } from '@playwright/test';

test('Diagnóstico de credenciales login', async ({ page }) => {
  await page.goto('/login', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  // Probar con 6670000000
  await page.locator('input').first().fill('6670000000');
  await page.locator('input[type="password"]').fill('123456');
  await page.getByRole('button', { name: 'Ingresar' }).click();
  await page.waitForTimeout(2000);

  const otpVisible1 = await page.getByPlaceholder('Ingresa el código de 6 dígitos').isVisible().catch(() => false);
  const error1 = await page.getByText(/Ha ocurrido un error|Usuario y\/o contraseña/i).textContent().catch(() => '');

  console.log('Resultado con 6670000000 -> OTP visible:', otpVisible1, 'Error:', error1);

  if (!otpVisible1) {
    // Probar con 0001
    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    await page.locator('input').first().fill('0001');
    await page.locator('input[type="password"]').fill('123456');
    await page.getByRole('button', { name: 'Ingresar' }).click();
    await page.waitForTimeout(2000);

    const otpVisible2 = await page.getByPlaceholder('Ingresa el código de 6 dígitos').isVisible().catch(() => false);
    const error2 = await page.getByText(/Ha ocurrido un error|Usuario y\/o contraseña/i).textContent().catch(() => '');
    console.log('Resultado con 0001 -> OTP visible:', otpVisible2, 'Error:', error2);
  }
});
