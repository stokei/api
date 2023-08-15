export interface CreatePaymentDTO {
  parent: string;
  currency: string;
  paymentMethod?: string;
  stripeCheckoutSession?: string;
  totalAmount: number;
  subtotalAmount: number;
  app: string;
  createdBy: string;
}
