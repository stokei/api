export const convertAmountToCurrencyString = ({
  amount,
  currency,
  language,
  minorUnit
}: {
  amount: number;
  currency: string;
  language?: string;
  minorUnit?: number;
}) => {
  const valueAmount = amount ? amount / Math.pow(10, minorUnit || 0) : 0;
  try {
    return valueAmount?.toLocaleString(language || 'pt-BR', {
      currency,
      style: 'currency',
      minimumFractionDigits: minorUnit || 0,
      maximumFractionDigits: 10
    });
  } catch (error) {
    return 0;
  }
};
