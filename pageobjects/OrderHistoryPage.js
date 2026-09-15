class OrderHistoryPage{
    constructor(page){
        this.tableRow = page.locator("table tbody tr");
        this.orderIdDetails = page.locator(".col-title+div");

    }

    async searchOrderAndSelect(orderId){
        await this.tableRow.first().waitFor({state: 'visible'});
        const rowCount = await this.tableRow.count();
        console.log("Total Order Count: "+rowCount);
        for(let i=0;i<rowCount;i++){
            const rowOrderId = await this.tableRow.nth(i).locator("th").textContent();
            if(orderId.includes(rowOrderId)){
                await this.tableRow.nth(i).locator("button:has-text('View')").click();
                break;
            }
        }
    }

    async getOrderId(){
        return this.orderIdDetails.textContent();
    }
}

module.exports = {OrderHistoryPage};