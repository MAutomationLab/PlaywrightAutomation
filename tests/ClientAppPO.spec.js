const {test,expect} = require('@playwright/test');
/*this line loads the Playwright Test package and immediately unpacks two of 
its exported members (test for declaring test cases, expect for assertions) 
into local variables you can call directly in your file.*/

const { POManger } = require('../pageobjects/POManger');
//Json ->string ->js Object
const dataSet = JSON.parse(JSON.stringify(require('../testdata/placeorder.json')))

for(const data of dataSet){
    test(`Plcae E-Commerce Order for ${data.productName}`, async ({page})=>{

        const poManger = new POManger(page);

        const userName = data.userName;
        const password = data.password;
        const productName=data.productName;
        const countryCode=data.countryCode;
        const countryName=data.countryName;

        const loginPage = poManger.getLoginPage(page);
        await loginPage.goTo("https://rahulshettyacademy.com/client");
        await loginPage.validLogin(userName, password);

        const dashboardPage = poManger.getDashboardPage(page);
        await dashboardPage.searchProductAddCart(productName);
        await dashboardPage.navigateToCart();

        const cartPage = poManger.getCartPage(page);
        await cartPage.verifyProductIsDisplayed(productName);
        await cartPage.checkout();

        const ordersReviewPage = poManger.getorderReviewPage(page);
        await ordersReviewPage.searchCountryAndSelect(countryCode, countryName);
        await ordersReviewPage.verifyUserNameLabel(userName);
        const orderId = await ordersReviewPage.submitOrderAndGetOrderId();
        console.log("Order Id: "+orderId);
        await ordersReviewPage.navigateToOrderHistory();

        //Find Order in Order History
        const orderHistoryPage = poManger.getorderHistoryPage(page);
        await orderHistoryPage.searchOrderAndSelect(orderId);

        const orderNo = await orderHistoryPage.getOrderId();
        expect(orderId.includes(orderNo)).toBeTruthy();
    
    });

}
