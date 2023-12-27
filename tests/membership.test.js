const assert = require('assert');
const Membership = require('../membership');
const Cart = require("../cart");

describe('Membership Class', () => {
  it('should apply membership and calculate discounts correctly', () => {
    const cart = new Cart();

    const membership = new Membership(cart);

    membership.apply();
    
    cart.items = [
      { programme: 'CERTIFICATION', amount: '1' },
      { programme: 'DEGREE', amount: '2' },
      { programme: 'DIPLOMA', amount: '2' }
    ];

    assert.strictEqual(membership.proMembership, true);
    assert.strictEqual(membership.proDiscount, 0);

    membership.calculate();
    assert.strictEqual(cart.lowestPrice, 2475.00);
  });
});
