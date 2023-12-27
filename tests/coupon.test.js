const assert = require('assert');
const Coupon = require('../coupon');

describe('Coupon Class', () => {
  it('should apply coupon and calculate discounts correctly', () => {
    const cart = {
      countItem: () => 5, // Mocked countItem function for simplicity
      subtotal: 150.00,
      appliedCoupon: '',
      couponDiscount: 0.00,
      lowestPrice: 0,
    };

    const coupon = new Coupon(cart);

    // Apply coupon
    coupon.apply('DEAL_G5');
    assert.strictEqual(cart.appliedCoupon, 'DEAL_G5');

    // Check overrideCoupon
    coupon.overrideCoupon(4);
    assert.strictEqual(cart.appliedCoupon, 'B4G1');

    // Discount calculation
    coupon.discount('DEAL_G5');
    assert.strictEqual(cart.couponDiscount, 0.05 * cart.subtotal);

    coupon.discount('B4G1');
    assert.strictEqual(cart.couponDiscount, cart.lowestPrice);
  });

});
