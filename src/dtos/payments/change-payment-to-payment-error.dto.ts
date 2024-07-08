export interface ChangePaymentToPaymentErrorDTO {
  payment: string;
  paymentMethod?: string;
  stripeCheckoutSession?: string;
  updatedBy: string;
}
