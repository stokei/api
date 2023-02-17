export interface AttachStripePaymentMethodToCustomerDTO {
  app: string;
  customer: string;
  paymentMethod: string;
  stripeAccount?: string;
}
