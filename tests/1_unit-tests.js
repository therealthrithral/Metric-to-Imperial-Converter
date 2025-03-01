const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

const convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    suite('Function convertHandler.getNum(input)', function () {
        test('Whole number input', function (done) {
            const input = '32L';
            assert.equal(convertHandler.getNum(input), 32);
            done();
        });
        test('Decimal Input', function (done) {
            const input = '3.1L';
            assert.equal(convertHandler.getNum(input), 3.1);
            done();
        });
        test('Fractional Input', function (done) {
            const input = '1/2L';
            assert.equal(convertHandler.getNum(input), 0.5);
            done();
        });
        test('Fractional Input with Decimal', function (done) {
            const input = '6/2.5L';
            assert.equal(convertHandler.getNum(input), 2.4);
            done();
        });
        test('Invalid Input (double fraction)', function (done) {
            const input = '0/20/20L';
            assert.equal(convertHandler.getNum(input), undefined);
            done();
        });
        test('No Numerical Input (default to 1)', function (done) {
            const input = 'L';
            assert.equal(convertHandler.getNum(input), 1);
            done();
        });
    });
    suite('Function convertHandler.getUnit(input)', function () {
        test('For Each Valid Unit Inputs', function (done) {
            const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
            input.forEach(function (ele) {
                ele = ele.toLowerCase();
                if (ele === 'l') {
                    ele = ele.toUpperCase();
                }
                assert.equal(ele, convertHandler.getUnit(ele));
            });
            done();
        });
        test('Unknown Unit Input', function (done) {
            const input = 'i';
            assert.equal(convertHandler.getUnit(input), undefined);
            done();
        });
    });
    suite('Function convertHandler.getReturnUnit(initUnit)', function () {
        test('For Each Valid Unit Inputs', function (done) {
            const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
            const expect = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
            input.forEach(function (ele, i) {
                assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
            });
            done();
        });
    });
    suite('Function convertHandler.spellOutUnit(unit)', function () {
        test('For Each Valid Unit Inputs', function (done) {
            //see above example for hint
            const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
            const expect = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
            input.forEach(function (ele, i) {
                assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
            });
            done();
        });
    });
    suite('Function convertHandler.convert(num, unit)', function () {
        test('Gal to L', function (done) {
            const input = [5, 'gal'];
            const expected = 18.9271;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); // 0.1 tolerance
            done();
        });
        test('L to Gal', function (done) {
            const input = [5, 'L'];
            const expected = 1.32086;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); // 0.1 tolerance
            done();
        });
        test('Mi to Km', function (done) {
            const input = [5, 'mi'];
            const expected = 8.04672;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); // 0.1 tolerance
            done();
        });
        test('Km to Mi', function (done) {
            const input = [5, 'km'];
            const expected = 3.10686;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); // 0.1 tolerance
            done();
        });
        test('Lbs to Kg', function (done) {
            const input = [5, 'lbs'];
            const expected = 2.26796;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); // 0.1 tolerance
            done();
        });
        test('Kg to Lbs', function (done) {
            const input = [5, 'kg'];
            const expected = 11.0231;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); // 0.1 tolerance
            done();
        });
    });
});