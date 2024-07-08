import { getFeeAmount } from '.';

describe('GetFeeAmount', () => {
  it('should return undefined if amount or feeAmount is empty', () => {
    expect(
      getFeeAmount({
        amount: undefined,
        feePercentage: 5
      })
    ).toBeUndefined();
    expect(
      getFeeAmount({
        amount: 1000,
        feePercentage: undefined
      })
    ).toBeUndefined();
  });
  it('should return correct fee amount to STRIPE payment method', () => {
    expect(
      getFeeAmount({
        amount: 10000,
        feePercentage: 5
      })
    ).toBe(500); // R$ 5,00
  });
});
