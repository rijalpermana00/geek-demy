const Programme = require("./programme");

const MEMBERSHIPFEE = 200
const DIPLOMA_DISCOUNT = 0.01;
const CERTIFICATION_DISCOUNT = 0.02;
const DEGREE_DISCOUNT = 0.03;

class Membership{
    constructor(cart){
        this.cart = cart
        this.fee = MEMBERSHIPFEE
        this.discountRate = {
            DIPLOMA:DIPLOMA_DISCOUNT,
            CERTIFICATION:CERTIFICATION_DISCOUNT,
            DEGREE:DEGREE_DISCOUNT
        }
        this.proMembership = false
        this.proDiscount = 0
        this.programme = new Programme
    }
    
    apply(){
        this.proMembership = true;
        this.calculate()
        this.cart.calculate(MEMBERSHIPFEE)
    }
    
    calculate(){
        const listItem = this.cart.listItems()
        listItem.forEach(item => {
            const price = this.programme.loadPrice(item.programme)
            const discount = this.discountRate[item.programme]
            let totalDiscount = ((price*item.amount)*discount);
            this.proDiscount += totalDiscount;
            this.cart.calculate(-totalDiscount)
        });
    }
}

module.exports = Membership;