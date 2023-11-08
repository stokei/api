import { PaymentMethodType } from '@/enums/payment-method-type.enum';

export interface CreateStripeCheckoutSessionPriceDTO {
  name: string;
  description?: string;
  amount: number;
  quantity: number;
}

export interface CreateStripeCheckoutSessionDTO {
  app: string;
  currency: string;
  applicationFeePercentage: number;
  applicationFeeAmount: number;
  successUrl: string;
  cancelUrl: string;
  prices: CreateStripeCheckoutSessionPriceDTO[];
  customer: string;
  paymentMethod?: string;
  paymentMethodType: PaymentMethodType;
  customerReference: string;
  order: string;
  payment: string;
  customerEmail: string;
  stripeAccount: string;
}
