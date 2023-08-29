export interface ChangePaymentToPaidDTO {
  payment: string;
  paymentMethod?: string;
  stripeCheckoutSession?: string;
  app: string;
  updatedBy: string;
}
