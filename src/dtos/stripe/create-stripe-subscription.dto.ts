export interface CreateStripeCheckoutSessionPriceDTO {
  price: string;
  quantity: number;
}

export interface CreateStripeSubscriptionDTO {
  app: string;
  currency: string;
  prices: CreateStripeCheckoutSessionPriceDTO[];
  customer: string;
  startPaymentWhenSubscriptionIsCreated: boolean;
  paymentMethod?: string;
  automaticRenew?: boolean;
  stripeAccount?: string;
}
