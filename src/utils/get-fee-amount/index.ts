interface GetFeeAmountData {
  readonly amount: number;
  readonly feePercentage: number;
}

export const getFeeAmount = ({ feePercentage, amount }: GetFeeAmountData) => {
  if (!amount || !feePercentage) {
    return;
  }
  const amountPercentage = feePercentage
    ? Math.round(amount * (feePercentage / 100))
    : amount;
  return Math.round(amountPercentage);
};
