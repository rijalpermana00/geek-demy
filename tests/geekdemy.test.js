const fs = require('fs');
const assert = require('assert');
const Geekdemy = require('../main');
const { captureConsoleLog } = require('./test-utils');


describe('Geekdemy Test', () => {
  function testGeekdemyData(filename, expectedOutput) {
    it(`Should correctly show data for ${filename}`, () => {
      const filePath = `sample_input/${filename}`;
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          throw {
            code: 500,
            msg: err.message,
          };
        }

        const geekdemy = new Geekdemy();
        const consoleOutput = captureConsoleLog(() => {
          geekdemy.main(data);
        });
        
        expectedOutput.forEach((expected) => {
          assert.ok(consoleOutput.includes(expected));
        });
      });
    });
  }

  // Test 1
  testGeekdemyData('input1.txt', [
    "SUB_TOTAL 13000.00",
    "COUPON_DISCOUNT B4G1 2500.00",
    "TOTAL_PRO_DISCOUNT 0.00",
    "PRO_MEMBERSHIP_FEE 0.00",
    "ENROLLMENT_FEE 0.00",
    "TOTAL 10500.00",
  ]);

  // Test 2
  testGeekdemyData('input2.txt', [
    "SUB_TOTAL 10000.00",
    "COUPON_DISCOUNT DEAL_G20 2000.00",
    "TOTAL_PRO_DISCOUNT 0.00",
    "PRO_MEMBERSHIP_FEE 0.00",
    "ENROLLMENT_FEE 0.00",
    "TOTAL 8000.00",
  ]);
});