import { getFeeAmount } from '.';

describe('GetFeeAmount', () => {
  it('should return correct fee amount', () => {
    const request = getFeeAmount({
      amount: 100,
      feePercentage: 7
    });
    const response = 7;
    expect(request).toBe(response);
  });
  it('should return fee amount equals amount when feePercentage is empty', () => {
    const request = getFeeAmount({
      amount: 100,
      feePercentage: 0
    });
    const response = 100;
    expect(request).toBe(response);
  });
});
