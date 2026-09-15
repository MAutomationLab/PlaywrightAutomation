const base = require('@playwright/test');
const {request}= require('@playwright/test');
const {ApiUtils} = require('./ApiUtils');
const loginPayload = {userEmail:"kunapradhan.mp@gmail.com",userPassword:"Kuna@3456"};
const orderPayload = {orders:[{country:"India",productOrderedId:"6960eac0c941646b7a8b3e68"}]};

exports.customtest =base.test.extend({
    authenticatedPage: async ({browser}, use)=>{
        const context =await browser.newContext();
        const page= await context.newPage();
        await page.goto("https://rahulshettyacademy.com/client");

        await page.locator("#userEmail").fill("kunapradhan.mp@gmail.com");
        await page.locator("#userPassword").fill("Kuna@3456");

        await page.locator("#login").click();

        // Wait until at least one card is present in DOM
        await page.locator(".card-body b").first().waitFor({ state: 'visible' });
        await use(page);

        //tear down
        await context.close();

    },

    createOrder: async ({},use)=>{
        const apiContext= await request.newContext();
        const apiUtil = new ApiUtils(apiContext, loginPayload);
        const response = await apiUtil.createOrder(orderPayload);
        use(response);

        await apiContext.dispose();

    }

})