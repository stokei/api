import { convertAmountToCurrencyString } from '.';

describe('convertAmountToCurrencyString', () => {
  it.each([
    {
      amount: 100_00,
      currency: 'BRL',
      minorUnit: 2,
      expected: 'R$ 100,00'
    },
    {
      amount: 1_000_00,
      currency: 'BRL',
      minorUnit: 2,
      expected: 'R$ 1.000,00'
    },
    {
      amount: 1_000_00,
      currency: 'USD',
      minorUnit: 2,
      language: 'en-US',
      expected: '$1,000.00'
    },
    {
      amount: 1_000_00,
      currency: 'USD',
      minorUnit: 2,
      expected: 'US$ 1.000,00'
    },
    {
      amount: -100_0,
      currency: 'AUD',
      minorUnit: 1,
      expected: '-AU$ 100,0'
    },
    {
      amount: 0,
      currency: 'JPY',
      minorUnit: 0,
      expected: 'JP¥ 0'
    }
  ])(
    'should convert amount to currency string',
    ({ amount, minorUnit, currency, language, expected }) => {
      const request = convertAmountToCurrencyString({
        amount,
        language,
        currency,
        minorUnit
      });
      expect(request).toBe(expected);
    }
  );
});
