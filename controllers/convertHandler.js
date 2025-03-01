const units = {
  'gal': ['gallons', 'L', 3.78541],
  'L': ['liters', 'gal', 0.264172],
  'lbs': ['pounds', 'kg', 0.453592],
  'kg': ['kilograms', 'lbs', 2.204624],
  'mi': ['miles', 'km', 1.60934],
  'km': ['kilometers', 'mi', 0.621373]
};

function FractionStrToDecimal(str) {
  return str.split('/').reduce((p, c) => p / c);
}

function ConvertHandler() {

  this.getNum = function (input) {
    if (input.search(/^\/|\/$|(\/)(?=.*\1)/) !== -1) {
      // Invalid if input begins or ends with slash (/) or it contains repeated slash (/) characters
      input = undefined;
    } else if (input.search(/[^\/](\/)/) !== -1) {
      // Convert fraction to decimal
      input = FractionStrToDecimal(input.replace(/[a-zA-Z]/g, ''));
    } else if (isNaN(parseFloat(input))) {
      // Set to 1 if no number in input
      input = 1;
    } else {
      input = Number.parseFloat(input);
    }

    return input;
  };

  this.getUnit = function (input) {
    var unit = input.substring(input.search(/[a-zA-Z]/)).toLowerCase();

    if (unit === 'l') {
      unit = unit.toUpperCase();
    }

    return (units[unit] !== undefined ? unit : undefined);
  };

  this.getReturnUnit = function (initUnit) {
    initUnit = initUnit.toLowerCase();

    if (initUnit === 'l') {
      initUnit = initUnit.toUpperCase();
    }

    return units[initUnit][1];
  };

  this.spellOutUnit = function (unit) {
    unit = unit.toLowerCase();

    if (unit === 'l') {
      unit = unit.toUpperCase();
    }

    return units[unit][0];
  };

  this.convert = function (initNum, initUnit) {
    // const galToL = 3.78541;
    // const lbsToKg = 0.453592;
    // const miToKm = 1.60934;
    initUnit = initUnit.toLowerCase();

    if (initUnit === 'l') {
      initUnit = initUnit.toUpperCase();
    }

    return Number.parseFloat((initNum * units[initUnit][2]).toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return initNum + ' ' + this.spellOutUnit(initUnit) + ' converts to ' + Number.parseFloat(returnNum).toFixed(5) + ' ' + this.spellOutUnit(returnUnit);
  };

}

module.exports = ConvertHandler;