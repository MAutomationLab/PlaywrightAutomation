const {test,expect} = require('@playwright/test');

test('Browser Context Validating Error Login',async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());

    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');

    await page.locator("#username").fill("rahulshettyacademy");
    //Correct Password: Learning@830$3mK2
    await page.locator("#password").fill("Learning");

    await page.locator("#terms").check();

    await page.locator("#signInBtn").click();

    const locator=await page.locator("[style*='block']");
    //console.log(locator.textContent());
    //await expect(page.locator("[style*='block']")).toHaveText("Incorrect username/password.");

    await expect(locator).toContainText("Incorrect username/password.");


});

test('Browser Context Playwright Test',async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();

    const username = page.locator("#username");
    const password = page.locator("#password");
    const term = page.locator("#terms");
    const signInButton = page.locator("#signInBtn");
    const cardTitle = page.locator(".card-body a")



    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());

    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');

    await username.fill("rahulshettyacademy");
    
    await password.fill("Learning@830$3mK2");

    await term.check();

    await signInButton.click();

    /*const text= await cardTitle.first().textContent();
    console.log(text);

    const text1= await cardTitle.nth(1).textContent();
    console.log(text1);*/

    //All the text contains
    const allVariable= await cardTitle.allTextContents();
    console.log(allVariable);


});

test('Page Playwright Test',async ({page})=>{
    await page.goto('https://google.com');
    console.log(await page.title());
    await expect(page).toHaveTitle('Google');

});

test('Ui Control',async ({page})=>{
    const username = page.locator("#username");
    const password = page.locator("#password");
    const selectDropdown = page.locator("[data-style='btn-info']")
    const term = page.locator("#terms");
    const signInButton = page.locator("#signInBtn");
    

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    await username.fill("rahulshettyacademy");
    
    await password.fill("Learning@830$3mK2");

    await page.locator("span.radiotextsty").last().click();
    await page.locator("#okayBtn").click();

    await expect(page.locator("span.radiotextsty").last()).toBeChecked();

    //await selectDropdown.selectOption({value: 'consult'});
    await selectDropdown.selectOption({index: 1});

    await term.check();
    await expect(term).toBeChecked();

    await expect(page.locator("[href*='documents-request']")).toHaveAttribute('class','blinkingText');

    //await signInButton.click();

});

test("Child window Handling",async ({browser})=> {
    const context = await browser.newContext();
    const page = await context.newPage();

    const username = page.locator("#username");
    const password = page.locator("#password");

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    const documentLink= page.locator("[href*='documents-request']");
    const [newPage] =await Promise.all(
    [
     context.waitForEvent('page'),//listen for any new page is opened pending,rejected,fulfilled
     documentLink.click()
    ]);

    const text = await newPage.locator(".red").first().textContent();
    console.log(text);
    const arrayText =text.split("@");
    const domainName= arrayText[1].split(" ")[0];
    console.log(domainName);

    await username.fill(domainName);
    console.log(await username.inputValue());
});