const STR_SUB_TOTAL = 'SUB_TOTAL';
const STR_COUPON_DISCOUNT = 'COUPON_DISCOUNT';
const STR_TOTAL_PRO_DISCOUNT = 'TOTAL_PRO_DISCOUNT';
const STR_PRO_MEMBERSHIP_FEE = 'PRO_MEMBERSHIP_FEE';
const STR_ENROLLMENT_FEE = 'ENROLLMENT_FEE';
const STR_TOTAL = 'TOTAL';
const STR_NONE = 'NONE';
const STR_ZERO = 0;

class Bill{
    
    constructor(main){
        this.main = main
    }
    
    print(){
        console.log(`${STR_SUB_TOTAL} ${this.countSubtotal()}`);
        console.log(`${STR_COUPON_DISCOUNT} ${(this.main.cart.appliedCoupon)} ${this.countCouponDiscount()}`);
        console.log(`${STR_TOTAL_PRO_DISCOUNT} ${(this.main.membership.proDiscount).toFixed(2)}`);
        console.log(`${STR_PRO_MEMBERSHIP_FEE} ${(this.main.membership.proMembership === true ? this.main.membership.fee : STR_ZERO).toFixed(2)}`);
        console.log(`${STR_ENROLLMENT_FEE} ${(this.main.cart.enrollmentFee === true ? this.main.cart.enrollmentFeePrice : STR_ZERO).toFixed(2)}`);
        console.log(`${STR_TOTAL} ${this.countTotal()}`);
    }
    
    countTotal(){
        return (
            this.main.cart.subtotal
            -this.main.cart.couponDiscount
            +(this.main.cart.enrollmentFee === true ? this.main.cart.enrollmentFeePrice : STR_ZERO)
        ).toFixed(2);
    }
    
    countSubtotal(){
        this.subtotal = this.main.cart.subtotal
        
        return this.subtotal.toFixed(2)
    }
    
    countCouponDiscount(){
        const coupon = this.main.cart.appliedCoupon;
        if(coupon == STR_NONE){
            return (STR_ZERO).toFixed(2)
        }
        this.main.coupon.discount(coupon);
        return (this.main.cart.couponDiscount).toFixed(2)
    }
}

module.exports = Bill;