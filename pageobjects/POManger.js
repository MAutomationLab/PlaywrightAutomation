const {LoginPage} = require('../pageobjects/LoginPage');
const {DashboardPage} = require('../pageobjects/DashboardPage');
const {CartPage} = require('../pageobjects/CartPage');
const { OrdersReviewPage } = require('../pageobjects/OrdersReviewPage');
const { OrderHistoryPage } = require('../pageobjects/OrderHistoryPage');

class POManger{
    constructor(page){
        this.page =page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.ordersReviewPage = new OrdersReviewPage(this.page);
        this.orderHistoryPage = new OrderHistoryPage(this.page);
    }
    getLoginPage(){
        return this.loginPage;
    }

    getDashboardPage(){
        return this.dashboardPage;
    }

    getCartPage(){
        return this.cartPage;
    }

    getorderReviewPage(){
        return this.ordersReviewPage;
    }

    getorderHistoryPage(){
        return this.orderHistoryPage;
    }
}
module.exports = {POManger};