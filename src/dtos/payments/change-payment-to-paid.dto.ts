export interface ChangePaymentToPaidDTO {
  payment: string;
  paymentMethod?: string;
  stripeCheckoutSession?: string;
  updatedBy: string;
}
