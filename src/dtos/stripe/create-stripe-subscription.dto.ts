export interface CreateStripeCheckoutSessionPriceDTO {
  price: string;
  quantity: number;
}

export interface CreateStripeSubscriptionDTO {
  app: string;
  currency: string;
  applicationFeePercentage: number;
  price: string;
  customer: string;
  stripeAccount: string;
}
