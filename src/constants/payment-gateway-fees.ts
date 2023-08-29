import { PaymentGatewayType } from '@/enums/payment-gateway-type.enum';

interface PaymentGatewayFeeValue {
  percentage: number;
  fixAmount: number;
}

export const paymentGatewayFees: Record<
  PaymentGatewayType,
  PaymentGatewayFeeValue
> = {
  [PaymentGatewayType.STRIPE]: {
    percentage: 7,
    fixAmount: 0
  },
  [PaymentGatewayType.PAGARME]: {
    percentage: 4,
    fixAmount: 200
  }
};
