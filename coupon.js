const COUP_B4G1 = 'B4G1'
const COUP_DEAL_G20 = 'DEAL_G20'
const COUP_DEAL_G5 = 'DEAL_G5'
const DISC_RATE_COUP_B4G1 = 1
const DISC_RATE_COUP_DEAL_G20 = 0.20
const DISC_RATE_COUP_DEAL_G5 = 0.05
const DISC_RATE_NONE = 0
const REQ_COUP_B4G1 = 4
const REQ_COUP_DEAL_G20 = 10000
const REQ_COUP_DEAL_G5 = 2
const COUP_NONE = 'NONE'

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
            NONE:DISC_RATE_NONE,
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
        let applyCoupon = false;
        this.overrideCoupon(countItem)
        
        switch(coupon){
            case COUP_DEAL_G5:
                applyCoupon = countItem >= REQ_COUP_DEAL_G5;
                break;
            case COUP_DEAL_G20:
                applyCoupon = subtotal >= REQ_COUP_DEAL_G20;
                break;
            default:
                applyCoupon = countItem >= REQ_COUP_B4G1;
                break;
        }
        
        if(applyCoupon){
            this.apply(coupon);
        }
    }
    
    overrideCoupon(item){
        if(item >= REQ_COUP_B4G1){
            this.apply(COUP_B4G1)
        }
        
    }
    
    checkCoupon(){
        return this.cart.appliedCoupon;
    }
    
    discount(coupon) {
        if(coupon){
            if(coupon == COUP_B4G1){
                this.cart.couponDiscount = this.cart.lowestPrice;    
            }else{
                this.cart.couponDiscount = this.discountRate[coupon] * this.cart.subtotal;
            }
        }
    }
}

module.exports = Coupon;