export interface CreateStripeCheckoutSessionPriceDTO {
  price: string;
  quantity: number;
}

export interface CreateStripeCheckoutSessionDTO {
  app: string;
  mode: 'subscription' | 'payment';
  currency: string;
  applicationFeePercentage: number;
  successUrl: string;
  cancelUrl: string;
  prices: CreateStripeCheckoutSessionPriceDTO[];
  customer: string;
  customerReference: string;
  customerEmail: string;
  stripeAccount: string;
}
