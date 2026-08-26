# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e.spec.ts >> SOLEVA Critical Customer Journeys >> 3. Product → Add Cart
- Location: tests\e2e.spec.ts:35:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: /Your Cart/i }).or(locator('text=Shopping Cart'))
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('heading', { name: /Your Cart/i }).or(locator('text=Shopping Cart'))

```

```yaml
- banner:
  - link "SOLEVA Logo SOLEVA":
    - /url: /
    - img "SOLEVA Logo"
    - text: SOLEVA
  - navigation:
    - link "New Arrivals":
      - /url: /shop?sort=newest
    - link "Sneakers":
      - /url: /shop?category=sneakers
    - link "Sports":
      - /url: /shop?category=sports
    - link "Men":
      - /url: /shop?gender=men
    - link "Women":
      - /url: /shop?gender=women
    - link "Sale":
      - /url: /shop?sale=true
  - button "Search"
  - button "Wishlist"
  - link "Account":
    - /url: /account
    - button "Account"
  - button "Cart"
  - button
- main:
  - main:
    - text: HomeSneakersApex Sneaker Ultra
    - img "Apex Sneaker Ultra"
    - button "View in 3D"
    - button "Apex Sneaker Ultra":
      - img "Apex Sneaker Ultra"
    - heading "Apex Sneaker Ultra" [level=1]
    - text: 5.0(327 Reviews) ₹15,299
    - paragraph: Experience unparalleled comfort and style with the Apex Sneaker Ultra. Designed specifically for sneakers enthusiasts, it features advanced materials and premium construction.
    - heading "ColorMidnight Navy" [level=3]
    - button
    - heading "Select Size Size Guide" [level=3]:
      - text: Select Size
      - button "Size Guide"
    - button "UK 5" [disabled]
    - button "UK 6"
    - button "UK 7"
    - button "UK 8"
    - button "UK 9"
    - button "UK 10"
    - button "UK 11"
    - button "UK 12" [disabled]
    - button "Add to Cart"
    - button "Toggle Wishlist"
    - heading "Free Premium Delivery" [level=4]
    - paragraph: Based on 391 reviews
    - heading "Free Returns" [level=4]
    - paragraph: 30 days free return policy. No questions asked.
    - heading "2 Year Warranty" [level=4]
    - paragraph: Quality guaranteed for all manufacturing defects.
    - heading "Customer Reviews" [level=2]
    - text: 0.0 out of 50 Reviews
    - paragraph: Log in to write a review
    - heading "No reviews yet" [level=3]
    - paragraph: Be the first to share your thoughts on this product.
- contentinfo:
  - img "SOLEVA Logo"
  - paragraph: Engineered for every step. Premium footwear designed for those who move differently.
  - button
  - button
  - button
  - heading "Shop" [level=4]
  - list:
    - listitem:
      - link "Sneakers":
        - /url: /shop?category=sneakers
    - listitem:
      - link "Sports":
        - /url: /shop?category=sports
    - listitem:
      - link "Men":
        - /url: /shop?gender=men
    - listitem:
      - link "Women":
        - /url: /shop?gender=women
    - listitem:
      - link "Sale":
        - /url: /shop?sale=true
  - heading "Support" [level=4]
  - list:
    - listitem:
      - link "FAQ":
        - /url: /faq
    - listitem:
      - link "Shipping & Returns":
        - /url: /shipping
    - listitem:
      - link "Track Order":
        - /url: /track
    - listitem:
      - link "Contact Us":
        - /url: /contact
    - listitem:
      - link "Size Guide":
        - /url: /size-guide
  - heading "Stay Connected" [level=4]
  - paragraph: Subscribe for exclusive drops & early access.
  - textbox "EMAIL ADDRESS"
  - button
  - text: FORM. FUNCTION. FUTURE.
  - paragraph: © 2026 SOLEVA. All rights reserved.
  - link "Privacy Policy":
    - /url: /privacy
  - link "Terms of Service":
    - /url: /terms
- alert
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('SOLEVA Critical Customer Journeys', () => {
  4   | 
  5   |   test('1. Home → Shop', async ({ page }) => {
  6   |     await page.goto('/');
  7   |     
  8   |     const shopNowLink = page.getByRole('link', { name: /SHOP/i }).first();
  9   |     await shopNowLink.click();
  10  |     
  11  |     await expect(page).toHaveURL(/.*\/shop/);
  12  |     await expect(page.getByRole('heading', { name: /Shop/i }).first()).toBeVisible();
  13  |   });
  14  | 
  15  |   test('2. Shop → Product', async ({ page }) => {
  16  |     await page.goto('/shop');
  17  |     
  18  |     const productLinks = page.locator('a[href^="/product/"]');
  19  |     await productLinks.first().waitFor({ state: 'visible' });
  20  |     const count = await productLinks.count();
  21  |     
  22  |     if (count > 0) {
  23  |       // Navigate directly using href to avoid intercepting overlay clicks (like Quick Add)
  24  |       const href = await productLinks.first().getAttribute('href');
  25  |       if (href) {
  26  |         await page.goto(href);
  27  |         await expect(page).toHaveURL(/.*\/product\/.+/);
  28  |         // Wait for product details to load before expecting Add to Cart
  29  |         await page.waitForLoadState('networkidle');
  30  |         await expect(page.getByRole('button', { name: /Add to Cart/i })).toBeVisible({ timeout: 10000 });
  31  |       }
  32  |     }
  33  |   });
  34  | 
  35  |   test('3. Product → Add Cart', async ({ page }) => {
  36  |     await page.goto('/shop');
  37  |     
  38  |     const productLinks = page.locator('a[href^="/product/"]');
  39  |     if (await productLinks.count() > 0) {
  40  |       const href = await productLinks.first().getAttribute('href');
  41  |       if (href) {
  42  |         await page.goto(href);
  43  |         
  44  |         const addToCartBtn = page.getByRole('button', { name: /Add to Cart/i });
  45  |         await addToCartBtn.click();
  46  |         
> 47  |         await expect(page.getByRole('heading', { name: /Your Cart/i }).or(page.locator('text=Shopping Cart'))).toBeVisible({ timeout: 10000 });
      |                                                                                                                ^ Error: expect(locator).toBeVisible() failed
  48  |       }
  49  |     }
  50  |   });
  51  | 
  52  |   test('4. Cart → Checkout', async ({ page }) => {
  53  |     await page.goto('/shop');
  54  |     const productLinks = page.locator('a[href^="/product/"]');
  55  |     if (await productLinks.count() > 0) {
  56  |       const href = await productLinks.first().getAttribute('href');
  57  |       if (href) {
  58  |         await page.goto(href);
  59  |         await page.getByRole('button', { name: /Add to Cart/i }).click();
  60  |         
  61  |         const checkoutBtn = page.getByRole('button', { name: /Checkout/i }).or(page.getByRole('link', { name: /Checkout/i }));
  62  |         await checkoutBtn.first().click();
  63  |         
  64  |         await expect(page).toHaveURL(/.*\/checkout/);
  65  |       }
  66  |     }
  67  |   });
  68  | 
  69  |   test('5. Search → Product', async ({ page }) => {
  70  |     await page.goto('/');
  71  |     
  72  |     const searchIcon = page.getByRole('button', { name: /Search/i });
  73  |     if (await searchIcon.isVisible()) {
  74  |       await searchIcon.click();
  75  |       
  76  |       const searchInput = page.getByPlaceholder(/Search/i);
  77  |       await searchInput.fill('shoe');
  78  |       
  79  |       await page.waitForTimeout(1000); 
  80  |       
  81  |       const resultLink = page.locator('a[href^="/product/"]').first();
  82  |       if (await resultLink.isVisible()) {
  83  |         const href = await resultLink.getAttribute('href');
  84  |         if (href) {
  85  |             await page.goto(href);
  86  |             await expect(page).toHaveURL(/.*\/product\/.+/);
  87  |         }
  88  |       }
  89  |     }
  90  |   });
  91  | 
  92  |   test('6. Filter → Product', async ({ page }) => {
  93  |     await page.goto('/shop');
  94  |     
  95  |     const filterBtn = page.getByRole('button', { name: /Men/i }).or(page.getByRole('checkbox', { name: /Men/i })).first();
  96  |     if (await filterBtn.isVisible()) {
  97  |       await filterBtn.click();
  98  |       
  99  |       await expect(page).toHaveURL(/.*category=.*/);
  100 |       
  101 |       const productLinks = page.locator('a[href^="/product/"]');
  102 |       await expect(productLinks.first()).toBeVisible();
  103 |     }
  104 |   });
  105 | 
  106 | });
  107 | 
```