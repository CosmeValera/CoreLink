import { test, expect } from '@playwright/test'

test.beforeEach('test & login', async ({ page }) => {
  await page.goto('http://localhost:3000/')

  const username = 'arch_admin'
  const password = 'gmv2gmv'

  await page.fill('input[name="username"]', username)
  await page.fill('input[name="password"]', password)
  await page.click('input[name="login"]')

  await page.waitForURL('http://localhost:3000/')

  await page.waitForSelector('.loader', { state: 'hidden' })
})

test('Load', async ({ page }) => {
  expect(await page.screenshot()).toMatchSnapshot('load.png')
})

test.describe('Sidebar', () => {
  test('Views', async({ page }) => {
    await page.getByLabel('Views').click()

    await page.getByText('Default views', { exact: true }).click()

    await page.waitForTimeout(1000)
    expect(await page.screenshot()).toMatchSnapshot('views.png')
  })
    
  test('Panels', async({ page }) => {
    await page.getByLabel('Panels').click()

    await page.getByText('Local Example', { exact: true }).click()
    await page.getByText('Local Satellite', { exact: true }).click()
    await page.getByText('Local Grafana', { exact: true }).click()
    await page.getByText('MONICO', { exact: true }).click()
    await page.getByText('Satellite', { exact: true }).click()

    await page.waitForTimeout(1000)
    expect(await page.screenshot()).toMatchSnapshot('panels.png')
  })
})

test.describe('Add new', () => {
  test('Add New', async({ page }) => {
    await page.getByText('ADD NEW').click()
    expect(await page.screenshot()).toMatchSnapshot('addNew.png')
  })
})


test('Logout', async ({ page }) => {
  await page.getByRole('button', { name: 'LOGOUT' }).click()

  await page.waitForURL(/http:\/\/localhost:8180\/.*/)

  await expect(page.locator('h1#kc-page-title')).toHaveText('Sign in to your account')

  expect(await page.screenshot()).toMatchSnapshot('logout.png')
})
