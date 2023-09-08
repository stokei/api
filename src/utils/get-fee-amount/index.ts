import { paymentGatewayFees } from '@/constants/payment-gateway-fees';
import { PaymentGatewayType } from '@/enums/payment-gateway-type.enum';
import { PaymentMethodType } from '@/enums/payment-method-type.enum';

interface GetFeeAmountData {
  readonly amount: number;
  readonly paymentGatewayType: PaymentGatewayType;
  readonly paymentMethodType: PaymentMethodType;
}

export const getTotalFeeAmount = ({
  paymentGatewayType,
  paymentMethodType,
  amount
}: GetFeeAmountData) => {
  const paymentGatewayFee =
    paymentGatewayFees[paymentGatewayType]?.[paymentMethodType];
  if (!paymentGatewayFee) {
    return;
  }
  const amountPercentage = paymentGatewayFee.totalPercentage
    ? Math.round(amount * (paymentGatewayFee.totalPercentage / 100))
    : amount;
  return Math.round(amountPercentage + paymentGatewayFee.totalFixAmount);
};

export const getStokeiFeeAmount = ({
  paymentGatewayType,
  paymentMethodType,
  amount
}: GetFeeAmountData) => {
  const paymentGatewayFee =
    paymentGatewayFees[paymentGatewayType]?.[paymentMethodType];
  if (!paymentGatewayFee) {
    return;
  }
  const amountPercentage = paymentGatewayFee.stokeiFeePercentage
    ? Math.round(amount * (paymentGatewayFee.stokeiFeePercentage / 100))
    : amount;
  return Math.round(amountPercentage + paymentGatewayFee.stokeiFeeFixAmount);
};
