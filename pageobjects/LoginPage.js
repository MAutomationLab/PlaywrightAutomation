class LoginPage{
    /** @param {import('@playwright/test').Page} page */
    constructor(page){
        this.page =page;
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.loginButton = page.locator("#login");

    }

    async goTo(url){
        await this.page.goto(url);
    }

    async validLogin(userName, password){
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    
}

module.exports= {LoginPage};