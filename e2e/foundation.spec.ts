import { expect, test } from '@playwright/test';

test('source lookup and patient workspace share Rahul’s reports', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/demo/his');
  await page.getByRole('textbox', { name: 'Source portal patient search' }).fill('F-DEMO-0001');
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  await page.getByRole('button', { name: 'Open record' }).click();
  await expect(page.getByRole('heading', { name: 'Rahul Sharma' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Open separate Lab portal' })).toHaveAttribute('href', '/demo/lab');
  await page.goto('/demo/lab');
  await expect(page.getByRole('textbox', { name: 'Source portal patient search' })).toBeEmpty();
  await page.getByRole('textbox', { name: 'Source portal patient search' }).fill('F-DEMO-0001');
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  await page.getByRole('button', { name: 'Open record' }).click();
  await page.getByRole('button', { name: 'Kidney function panel' }).click();
  await expect(page.getByRole('cell', { name: 'Creatinine', exact: true })).toBeVisible();
  await page.goto('/app');
  await page.getByRole('button', { name: 'Open Rahul Sharma' }).click();
  await page.getByRole('button', { name: 'Kidney function panel' }).click();
  await expect(page.getByRole('cell', { name: 'Creatinine', exact: true })).toBeVisible();
  await expect(page.getByText('2.1 mg/dL')).toBeVisible();
  await page.getByRole('button', { name: 'Close', exact: true }).click();
  await page.getByRole('tab', { name: 'Imaging (2)' }).click();
  await page.getByRole('button', { name: 'CT head · non-contrast' }).click();
  await expect(page.getByText('Historical synthetic study:', { exact: false })).toBeVisible();
  expect(errors).toEqual([]);
});

test('directory search and a direct patient refresh work', async ({ page }) => {
  await page.goto('/app/patients');
  await page.getByRole('searchbox', { name: 'Search patients by name or UHID' }).fill('priya');
  await page.getByRole('link', { name: 'Priya Patel', exact: true }).click();
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Priya Patel' })).toBeVisible();
  await expect(page.getByText('No reports available')).toBeVisible();
});
