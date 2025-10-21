import currency from 'currency.js';

export default {
  add: (value: any, addValue: any, { precision = 2 } = {}): string =>
    String(currency(value, { precision }).add(addValue)),
  format: (value: any, { decimal = '.', precision = 2, separator = ' ', symbol = '' } = {}) => {
    if (Number(value) === Math.floor(value)) {
      precision = 0;
    }
    return currency(value, { decimal, precision, separator, symbol }).format();
  },
  normalize: (value: any, { precision = 2 } = {}) => String(currency(value, { precision })),
  subtract: (value: any, subtractValue: any, { precision = 2 } = {}): string =>
    String(currency(value, { precision }).subtract(subtractValue))
};
