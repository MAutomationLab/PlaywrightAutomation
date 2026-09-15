const {expect} = require('@playwright/test');
class OrdersReviewPage{
    constructor(page){
        this.country = page.locator("[placeholder='Select Country']");
        this.dropDown = page.locator("section.ta-results");
        this.userNameLabel = page.locator(".user__name label");
        this.placeOrderButton = page.locator("[class*='btnn action']");
        this.orderConfirmationText = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
        this.orderHistory = page.locator("label[routerlink*='myorders']");
    }

    async verifyUserNameLabel(userName){
        await expect(this.userNameLabel).toHaveText(userName);
    }

    async searchCountryAndSelect(countryCode, countryname){
        await this.country.pressSequentially(countryCode);
        await this.dropDown.waitFor({state:'visible'});
        const optionsCount = await this.dropDown.locator("button").count();
        for(let i=0;i<optionsCount;i++){
            const countryName=await this.dropDown.locator("button").nth(i).textContent();
            console.log(countryName.trim());
            if(countryName.trim() === countryname){
                await this.dropDown.locator("button").nth(i).click();
                break;
            }
        }
    }

    async submitOrderAndGetOrderId(){
        await this.placeOrderButton.click();
        await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
        return await this.orderId.textContent();
    }

    async navigateToOrderHistory(){
        this.orderHistory.click();
    }
}

module.exports = {OrdersReviewPage};