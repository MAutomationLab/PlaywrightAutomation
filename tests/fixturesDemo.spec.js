const {test,expect,request} = require('@playwright/test');
const { customtest } = require('../utils/fixtures');

customtest("Fixtures Demo", async ({authenticatedPage, createOrder})=>{
    await authenticatedPage.goto("https://rahulshettyacademy.com/client");
    //Find Order in Order History
    await authenticatedPage.locator("button[routerlink*='myorders']").click();

    await authenticatedPage.locator("table tbody tr").first().waitFor({state: 'visible'});
    await expect(await authenticatedPage.getByText(createOrder.orderId)).toBeVisible();

});