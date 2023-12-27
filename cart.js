const Programme = require("./programme");
const ENROLLMENT_FEE = 500;
const ENROLLMENT_FEE_MINIMUM_VALUE = 6666;

class Cart{
    constructor(){
        this.items = []
        this.subtotal = 0.00
        this.appliedCoupon = ''
        this.lowestPrice = 0
        this.couponDiscount = 0
        this.enrollmentFeePrice = ENROLLMENT_FEE
        this.enrollmentFee = true
        this.programme = new Programme()
    }
    
    add(programme,amount){
        this.items.push({
            programme,
            amount
        });
        
        const price = this.programme.loadPrice(programme)
        this.checkLowestPrice(price);
        let cost = price*amount;
        this.calculate(cost.toFixed(2))
    }
    
    calculate(cost){
        this.subtotal += parseFloat(cost);
        if(this.subtotal >= ENROLLMENT_FEE_MINIMUM_VALUE){
            this.enrollmentFee = false
        }
    }
    
    checkLowestPrice(price){
        this.lowestPrice = this.lowestPrice <= price && this.lowestPrice > 0 ? this.lowestPrice : price;
    }
    
    listItems(){
        return this.items
    }
    
    countItem(){
        const listItem = this.listItems()
        let counter = 0;
        listItem.forEach(item => {
            counter += parseInt(item.amount);
        });
        
        return counter;
    }
}

module.exports = Cart;