export interface CreateStripeCustomerPortalSessionDTO {
  returnUrl: string;
  customer: string;
  stripeAccount: string;
}
