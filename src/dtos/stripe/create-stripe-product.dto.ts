export interface CreateStripeProductDTO {
  app: string;
  name: string;
  description?: string;
  stripeAccount: string;
}
