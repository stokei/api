export interface ChangePaymentToPaymentErrorDTO {
  payment: string;
  paymentMethod?: string;
  stripeCheckoutSession?: string;
  app: string;
  updatedBy: string;
}
