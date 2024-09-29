import { test, expect } from '@playwright/test';

test.describe('Restart PAFDTM', () => {
  test('03. Restart PAFDTM', async ({ page }) => {
    await page.goto('http://localhost:3003/');
    await page.getByRole('row', { name: 'Collapse Toggle select row PAFDTM' }).getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Restart', exact: true }).click();
    
    // Wait for the status to become STOPPED and then RUNNING
    await expect(page.getByRole('row', { name: 'Collapse Toggle select row PAFDTM' }).getByText("STOPPED", { exact: true })).toBeVisible({ timeout: 30000 });
    await expect(page.getByRole('row', { name: 'Collapse Toggle select row PAFDTM' }).getByText("RUNNING", { exact: true })).toBeVisible({ timeout: 30000 });
  });
});

test.describe('Stop and Start CPDEV', () => {
  test.describe.configure({ mode: 'serial' }); // SERIAL MODE
  
  test('01. Stop CPDEV', async ({ page }) => {
    await page.goto('http://localhost:3003/');
    await page.getByRole('row', { name: 'Collapse Toggle select row CPDEV' }).getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Stop' }).click();
    
    // Wait for the status to become STOPPED
    await expect(page.getByRole('row', { name: 'Collapse Toggle select row CPDEV' }).getByText("STOPPED", { exact: true })).toBeVisible({ timeout: 30000 });
  });
  
  test('02. Start CPDEV', async ({ page }) => {
    await page.goto('http://localhost:3003/');
    await page.getByRole('row', { name: 'Collapse Toggle select row CPDEV' }).getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Start', exact: true }).click();
    
    // Wait for the status to become RUNNING
    await expect(page.getByRole('row', { name: 'Collapse Toggle select row CPDEV' }).getByText("RUNNING", { exact: true })).toBeVisible({ timeout: 30000 });
  });
});
