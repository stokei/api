import { paymentGatewayFees } from '@/constants/payment-gateway-fees';
import { PaymentGatewayType } from '@/enums/payment-gateway-type.enum';

interface GetFeeAmountData {
  readonly amount: number;
  readonly paymentGatewayType: PaymentGatewayType;
}

export const getFeeAmount = ({
  paymentGatewayType,
  amount
}: GetFeeAmountData) => {
  const paymentGatewayFee = paymentGatewayFees[paymentGatewayType];
  const amountPercentage = paymentGatewayFee.percentage
    ? Math.round(amount * (paymentGatewayFee.percentage / 100))
    : amount;
  return Math.round(amountPercentage + paymentGatewayFee.fixAmount);
};
