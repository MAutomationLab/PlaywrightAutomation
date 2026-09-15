const {test, expect}= require('@playwright/test');
let webContext;

test.beforeAll(async ({browser})=>{
    const context=await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");

    await page.locator("#userEmail").fill("kunapradhan.mp@gmail.com");
    await page.locator("#userPassword").fill("Kuna@3456");

    await page.locator("#login").click();
    await page.waitForLoadState("networkidle");
    await context.storageState({path:"storageState.json"})

    webContext = await browser.newContext({storageState: "storageState.json"});

})

test("Client App Login", async ()=>{
    const productName="ZARA COAT 3";

    const page = await webContext.newPage();

    const products = page.locator("div.card-body");
    const cart = page.locator("[routerlink*='cart']");
    const dropDown = page.locator("section.ta-results");

    await page.goto("https://rahulshettyacademy.com/client");

    // Wait until at least one card is present in DOM
    await page.locator(".card-body b").first().waitFor({ state: 'visible' });
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

    
});
