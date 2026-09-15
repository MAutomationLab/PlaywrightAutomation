class ApiUtils{
    url= "https://rahulshettyacademy.com/api/ecom/auth/login";
    orderUrl= "https://rahulshettyacademy.com/api/ecom/order/create-order";
    constructor(apiContext,loginPayload){
        this.apiContext=apiContext;
        this.loginPayload =loginPayload;
    }
    async getToken(){
        const loginResponse = await this.apiContext.post(this.url,{data: this.loginPayload});
        const loginResponseJson = await loginResponse.json();
        const token =loginResponseJson.token
        console.log(token);
        return token;
    }

    async createOrder(orderPayload){
        let response ={};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post(this.orderUrl,{
            data:orderPayload,
            headers:{
                "Authorization": response.token,
                "content-type": "application/json"
            }
        });
        const orderJsonResponse = await orderResponse.json()
        const orderId = orderJsonResponse.orders[0];
        response.orderId= orderId;
        return response;
    }
}
module.exports={ApiUtils};