const assert = require('assert');
const Bill = require('../bill');
const { captureConsoleLog } = require('./test-utils');

describe('Bill Class', () => {
  it('should calculate total correctly', () => {
    const cart = {
      subtotal: 100.00,
      appliedCoupon: 'DEAL_G20',
      couponDiscount: 10.00,
      enrollmentFee: true,
      enrollmentFeePrice: 5.00,
    };

    const membership = {
      proMembership: true,
      fee: 20.00,
      proDiscount: 5.00,
    };

    const main = {
      cart,
      membership,
      coupon: {
        discount: () => {},
      },
    };

    const bill = new Bill(main);

    const consoleOutput = captureConsoleLog(() => {
      bill.print();
    });

    const expectedOutput = [
      `SUB_TOTAL ${cart.subtotal.toFixed(2)}`,
      `COUPON_DISCOUNT ${cart.appliedCoupon} ${cart.couponDiscount.toFixed(2)}`,
      `TOTAL_PRO_DISCOUNT ${membership.proDiscount.toFixed(2)}`,
      `PRO_MEMBERSHIP_FEE ${membership.proMembership ? membership.fee.toFixed(2) : '0.00'}`,
      `ENROLLMENT_FEE ${cart.enrollmentFee ? cart.enrollmentFeePrice.toFixed(2) : '0.00'}`,
      `TOTAL ${bill.countTotal()}`,
    ];
    
    expectedOutput.forEach((expected) => {
      assert.ok(consoleOutput.includes(expected));
    });
  });
});
