interface GetFeeAmountData {
  readonly amount: number;
  readonly feePercentage: number;
}

export const getFeeAmount = ({ feePercentage, amount }: GetFeeAmountData) => {
  return Math.round(amount * (100 / feePercentage));
};
