const assert = require('assert');
const Programme = require('../programme');

describe('Programme Class', () => {
  it('should load programme prices correctly', () => {
    const programme = new Programme();

    assert.strictEqual(programme.loadPrice('CERTIFICATION'), 3000);
    assert.strictEqual(programme.loadPrice('DEGREE'), 5000);
    assert.strictEqual(programme.loadPrice('DIPLOMA'), 2500);
  });
});
