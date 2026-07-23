import { test, expect } from '@playwright/test';

test('Employee page loads successfully', async ({ page }) => {

  await page.goto('http://localhost:3000/employees');

await expect(
  page.getByRole('heading', { name: 'Employees' })
).toBeVisible();

});


test('Add Employee button is visible', async ({ page }) => {

  await page.goto('http://localhost:3000/employees');

  await expect(
    page.getByText('+ Add Employee')
  ).toBeVisible();

});