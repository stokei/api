export const convertCurrencyToString = ({
  amount,
  currency,
  minorUnit
}: {
  amount: number;
  currency: string;
  minorUnit?: number;
}) => {
  const valueAmount = amount ? amount / Math.pow(10, minorUnit || 0) : 0;
  try {
    return valueAmount?.toLocaleString('pt-BR', {
      currency,
      minimumFractionDigits: minorUnit || 0,
      maximumFractionDigits: 10
    });
  } catch (error) {
    return 0;
  }
};
