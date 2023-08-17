export interface CreatePaymentDTO {
  parent: string;
  payer: string;
  currency: string;
  paymentMethod?: string;
  stripeCheckoutSession?: string;
  totalAmount: number;
  subtotalAmount: number;
  app: string;
  createdBy: string;
}
