import { PaymentGatewayType } from '@/enums/payment-gateway-type.enum';
import { PaymentMethodType } from '@/enums/payment-method-type.enum';

export interface PaymentMethodTypeFee {
  totalPercentage: number; // Total fee percentage user
  stokeiFeePercentage: number; // Fee percentage from app to user
  totalFixAmount: number; // Total fee fix amount user
  stokeiFeeFixAmount: number; // Fee fix amount from app to user
}
export type PaymentGatewayFeeValue = Record<
  PaymentMethodType,
  PaymentMethodTypeFee
>;
export type PaymentGatewayFees = Record<
  PaymentGatewayType,
  PaymentGatewayFeeValue
>;

export const paymentGatewayFees: PaymentGatewayFees = {
  [PaymentGatewayType.STRIPE]: {
    [PaymentMethodType.STRIPE]: {
      totalPercentage: 9,
      stokeiFeePercentage: 9,
      totalFixAmount: 200,
      stokeiFeeFixAmount: 200
    },
    [PaymentMethodType.BOLETO]: undefined,
    [PaymentMethodType.CARD]: undefined,
    [PaymentMethodType.PIX]: undefined
  },
  [PaymentGatewayType.PAGARME]: {
    [PaymentMethodType.STRIPE]: undefined,
    [PaymentMethodType.BOLETO]: {
      totalPercentage: 5,
      stokeiFeePercentage: 5,
      totalFixAmount: 200,
      stokeiFeeFixAmount: 200
    },
    [PaymentMethodType.CARD]: {
      totalPercentage: 9,
      stokeiFeePercentage: 9,
      totalFixAmount: 200,
      stokeiFeeFixAmount: 200
    },
    [PaymentMethodType.PIX]: {
      totalPercentage: 4,
      stokeiFeePercentage: 4,
      totalFixAmount: 200,
      stokeiFeeFixAmount: 200
    }
  }
};
