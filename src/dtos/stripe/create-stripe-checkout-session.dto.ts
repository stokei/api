import { PaymentMethodType } from '@/enums/payment-method-type.enum';

export interface CreateStripeCheckoutSessionPriceDTO {
  amount: number;
  price: string;
  quantity: number;
}

export interface CreateStripeCheckoutSessionDTO {
  app: string;
  mode: 'subscription' | 'payment';
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
