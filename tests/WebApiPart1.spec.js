const {test, expect, request}= require('@playwright/test');
const {ApiUtils} =require('../utils/ApiUtils');

const loginPayload = {userEmail:"kunapradhan.mp@gmail.com",userPassword:"Kuna@3456"};
const orderPayload = {orders:[{country:"India",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
//let token;
//let orderId;
let response;

test.beforeAll(async ()=>{
    const apiContext= await request.newContext();
    const apiUtil = new ApiUtils(apiContext, loginPayload);
    response = await apiUtil.createOrder(orderPayload)
    
});

test.beforeEach(()=>{

});

test("Place the order", async ({page})=>{
    /*
    const productName="ZARA COAT 3";
    const email = "kunapradhan.mp@gmail.com";
    const products = page.locator("div.card-body");
    const cart = page.locator("[routerlink*='cart']");
    const dropDown = page.locator("section.ta-results");
    */

    await page.addInitScript(value=>{
        window.localStorage.setItem('token',value);
    },response.token);

    await page.goto("https://rahulshettyacademy.com/client");
    
    /*await page.goto("https://rahulshettyacademy.com/client");

    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Kuna@3456");

    await page.locator("#login").click();
    */

    // Wait until at least one card is present in DOM
    /*await page.locator(".card-body b").first().waitFor({ state: 'visible' });
    const cardBodies=await page.locator(".card-body b").allTextContents();
    console.log(cardBodies);

    const count= await products.count();
    for(let i=0;i<count;i++){
        const prodName = await products.nth(i).locator("b").textContent();
        console.log(prodName);
        if(prodName === productName){
            //Add to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }

    }

    await cart.click();
    await page.locator(".cart li").first().waitFor({state: 'visible'});
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

    await page.locator("text=Checkout").click();

    await page.locator("[placeholder='Select Country']").pressSequentially("ind");
    await dropDown.waitFor({state:'visible'});
    
    const buttonCount = await dropDown.locator("button").count();
    for(let i=0;i<buttonCount;i++){
        const countryName=await dropDown.locator("button").nth(i).textContent();
        console.log(countryName.trim());
        if(countryName.trim() === "India"){
            await dropDown.locator("button").nth(i).click();
            break;
        }
        
    }

    const userEmail = await page.locator(".user__name label").textContent();
    expect(userEmail).toEqual(email);

    await page.locator("[class*='btnn action']").click();

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log("Order Id: "+orderId);
    */

    //await page.pause();

    //Find Order in Order History
    await page.locator("button[routerlink*='myorders']").click();

    await page.locator("table tbody tr").first().waitFor({state: 'visible'});

    const orderCount = await page.locator("table tbody tr").count();
    console.log("Total Order Fetched: "+orderCount);

    for(let i=0;i<orderCount;i++){
        const rowOrderId = await page.locator("table tbody tr").nth(i).locator("th").textContent();
        console.log(rowOrderId);
       if(response.orderId.includes(rowOrderId)){
          await page.locator("table tbody tr").nth(i).locator("button:has-text('View')").click();
          break;
       }
    }

    const orderNo = await page.locator(".col-title+div").textContent();
    await expect(response.orderId.includes(orderNo)).toBeTruthy();

});