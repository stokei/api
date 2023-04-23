export interface CreateStripeSubscriptionItemDTO {
  subscription: string;
  price: string;
  quantity: number;
  stripeAccount: string;
}
