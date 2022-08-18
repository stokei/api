export interface CreateStripeCheckoutSessionPriceDTO {
  price: string;
  quantity: number;
}

export interface CreateStripeCheckoutSessionDTO {
  app: string;
  currency: string;
  successUrl: string;
  cancelUrl: string;
  prices: CreateStripeCheckoutSessionPriceDTO[];
  customer: string;
  stripeAccount: string;
}
