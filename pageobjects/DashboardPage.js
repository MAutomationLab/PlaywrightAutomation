class DashboardPage{
    /** @param {import('@playwright/test').Page} page */
    constructor(page){
        this.products = page.locator("div.card-body");
        this.productTexts = page.locator(".card-body b");
        this.cartPage = page.locator("[routerlink*='cart']");
    }

    async searchProductAddCart(productName){
        // Wait until at least one card is present in DOM
        await this.productTexts.first().waitFor({ state: 'visible' });
        const title=await this.productTexts.allTextContents();
        console.log(title);
        const count= await this.products.count();
        for(let i=0;i<count;i++){
            const prodName = await this.products.nth(i).locator("b").textContent();
            if(prodName === productName){
                //Add to cart
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }

    async navigateToCart(){
        await this.cartPage.click();
    }
}
module.exports ={DashboardPage};