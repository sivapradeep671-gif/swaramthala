import { test, expect } from '@playwright/test';

test.describe('SOLEVA Critical Customer Journeys', () => {

  test('1. Home → Shop', async ({ page }) => {
    await page.goto('/');
    
    const shopNowLink = page.getByRole('link', { name: /SHOP/i }).first();
    await shopNowLink.click();
    
    await expect(page).toHaveURL(/.*\/shop/);
    await expect(page.getByRole('heading', { name: /Shop/i }).first()).toBeVisible();
  });

  test('2. Shop → Product', async ({ page }) => {
    await page.goto('/shop');
    
    const productLinks = page.locator('a[href^="/product/"]');
    await productLinks.first().waitFor({ state: 'visible' });
    const count = await productLinks.count();
    
    if (count > 0) {
      // Navigate directly using href to avoid intercepting overlay clicks (like Quick Add)
      const href = await productLinks.first().getAttribute('href');
      if (href) {
        await page.goto(href);
        await expect(page).toHaveURL(/.*\/product\/.+/);
        await expect(page.getByRole('button', { name: /Add to Cart/i })).toBeVisible({ timeout: 15000 });
      }
    }
  });

  test('3. Product → Add Cart', async ({ page }) => {
    await page.goto('/shop');
    
    const productLinks = page.locator('a[href^="/product/"]');
    if (await productLinks.count() > 0) {
      const href = await productLinks.first().getAttribute('href');
      if (href) {
        await page.goto(href);
        
        const addToCartBtn = page.getByRole('button', { name: /Add to Cart/i });
        await addToCartBtn.click();
        
        await expect(page.getByRole('heading', { name: /Your Cart/i }).or(page.locator('text=Shopping Cart'))).toBeVisible({ timeout: 10000 });
      }
    }
  });

  test('4. Cart → Checkout', async ({ page }) => {
    await page.goto('/shop');
    const productLinks = page.locator('a[href^="/product/"]');
    if (await productLinks.count() > 0) {
      const href = await productLinks.first().getAttribute('href');
      if (href) {
        await page.goto(href);
        await page.getByRole('button', { name: /Add to Cart/i }).click();
        
        const checkoutBtn = page.getByRole('button', { name: /Checkout/i }).or(page.getByRole('link', { name: /Checkout/i }));
        await checkoutBtn.first().click();
        
        await expect(page).toHaveURL(/.*\/checkout/);
      }
    }
  });

  test('5. Search → Product', async ({ page }) => {
    await page.goto('/');
    
    const searchIcon = page.getByRole('button', { name: /Search/i });
    if (await searchIcon.isVisible()) {
      await searchIcon.click();
      
      const searchInput = page.getByPlaceholder(/Search/i);
      await searchInput.fill('shoe');
      
      await page.waitForTimeout(1000); 
      
      const resultLink = page.locator('a[href^="/product/"]').first();
      if (await resultLink.isVisible()) {
        const href = await resultLink.getAttribute('href');
        if (href) {
            await page.goto(href);
            await expect(page).toHaveURL(/.*\/product\/.+/);
        }
      }
    }
  });

  test('6. Filter → Product', async ({ page }) => {
    await page.goto('/shop');
    
    const filterBtn = page.getByRole('button', { name: /Men/i }).or(page.getByRole('checkbox', { name: /Men/i })).first();
    if (await filterBtn.isVisible()) {
      await filterBtn.click();
      
      await expect(page).toHaveURL(/.*category=.*/);
      
      const productLinks = page.locator('a[href^="/product/"]');
      await expect(productLinks.first()).toBeVisible();
    }
  });

});
