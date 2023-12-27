const COUP_B4G1 = 'B4G1'
const COUP_DEAL_G20 = 'DEAL_G20'
const COUP_DEAL_G5 = 'DEAL_G5'
const DISC_RATE_COUP_B4G1 = 1
const DISC_RATE_COUP_DEAL_G20 = 0.20
const DISC_RATE_COUP_DEAL_G5 = 0.05
const REQ_COUP_B4G1 = 4
const REQ_COUP_DEAL_G20 = 10000
const REQ_COUP_DEAL_G5 = 2

class Coupon{
    constructor(cart){
        this.cart = cart;
        this.coupon = {
            B4G1:COUP_B4G1,
            DEAL_G20:COUP_DEAL_G20,
            DEAL_G5:COUP_DEAL_G5
        }
        this.discountRate = {
            B4G1:DISC_RATE_COUP_B4G1,
            DEAL_G20:DISC_RATE_COUP_DEAL_G20,
            DEAL_G5:DISC_RATE_COUP_DEAL_G5,
        }
    }
    
    apply(coupon) {
        const existingCoupon = this.checkCoupon();
    
        if (!existingCoupon || this.discountRate[existingCoupon] < this.discountRate[coupon]) {
            this.cart.appliedCoupon = this.coupon[coupon];
        }
    }
    
    eligibility(coupon){
        const countItem = this.cart.countItem();
        const subtotal = this.cart.subtotal;
        if(countItem >= REQ_COUP_B4G1){
            this.apply(COUP_B4G1)
            return;
        }
        
        switch(coupon){
            case COUP_DEAL_G5:
                if(countItem >= REQ_COUP_DEAL_G5){
                    this.apply(coupon)
                }
                break;
            case COUP_DEAL_G20:
                if(subtotal >= REQ_COUP_DEAL_G20){
                    this.apply(coupon)
                }
                break;
            default:
                if(countItem >= REQ_COUP_B4G1){
                    this.apply(coupon)
                }
                break;
        }
    }   
    
    checkCoupon(){
        return this.cart.appliedCoupon;
    }
    
    discount(coupon) {
        if(coupon == COUP_B4G1){
            this.cart.couponDiscount = this.cart.lowestPrice;    
        }else{
            this.cart.couponDiscount = this.discountRate[coupon] * this.cart.subtotal;
        }
    }
}

module.exports = Coupon;