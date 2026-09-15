const {expect} = require('@playwright/test');
class CartPage{
    /** @param {import('@playwright/test').Page} page */
    constructor(page){
        this.h3Tag = page.locator("h3");
        this.cartItams = page.locator(".cart li");
        this.checkoutButton = page.locator("text=Checkout")
    }

    async verifyProductIsDisplayed(productName){
        await this.cartItams.first().waitFor({state: 'visible'});
        const productIsVisble = await this.h3Tag.filter({ hasText: productName }).isVisible();
        await expect(productIsVisble).toBeTruthy();
    }

    async checkout(){;
        await this.checkoutButton.click();
    }
}
module.exports = {CartPage};