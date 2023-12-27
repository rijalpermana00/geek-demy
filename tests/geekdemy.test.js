const fs = require('fs');
const assert = require('assert');
const Geekdemy = require('../main');
const { captureConsoleLog } = require('./test-utils');
const SUB_TOTAL_VALUE_1 = 13000.00;
const COUPON_DISCOUNT_VALUE_1 = "B4G1 2500.00";
const TOTAL_PRO_DISCOUNT_VALUE_1 = 0.00;
const PRO_MEMBERSHIP_FEE_VALUE_1 = 0.00;
const ENROLLMENT_FEE_VALUE_1 = 0.00;
const TOTAL_VALUE_1 = 10500.00;

const SUB_TOTAL_VALUE_2 = 10000.00;
const COUPON_DISCOUNT_VALUE_2 = "DEAL_G20 2000.00";
const TOTAL_PRO_DISCOUNT_VALUE_2 = 0.00;
const PRO_MEMBERSHIP_FEE_VALUE_2 = 0.00;
const ENROLLMENT_FEE_VALUE_2 = 0.00;
const TOTAL_VALUE_2 = 8000.00;


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
    `SUB_TOTAL ${SUB_TOTAL_VALUE_1}`,
    `COUPON_DISCOUNT ${COUPON_DISCOUNT_VALUE_1}`,
    `TOTAL_PRO_DISCOUNT ${TOTAL_PRO_DISCOUNT_VALUE_1}`,
    `PRO_MEMBERSHIP_FEE ${PRO_MEMBERSHIP_FEE_VALUE_1}`,
    `ENROLLMENT_FEE ${ENROLLMENT_FEE_VALUE_1}`,
    `TOTAL ${TOTAL_VALUE_1}`,
  ]);

  // Test 2
  testGeekdemyData('input2.txt', [
    `SUB_TOTAL ${SUB_TOTAL_VALUE_2}`,
    `COUPON_DISCOUNT ${COUPON_DISCOUNT_VALUE_2}`,
    `TOTAL_PRO_DISCOUNT ${TOTAL_PRO_DISCOUNT_VALUE_2}`,
    `PRO_MEMBERSHIP_FEE ${PRO_MEMBERSHIP_FEE_VALUE_2}`,
    `ENROLLMENT_FEE ${ENROLLMENT_FEE_VALUE_2}`,
    `TOTAL ${TOTAL_VALUE_2}`,
  ]);
});