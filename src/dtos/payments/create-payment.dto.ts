export interface CreatePaymentDTO {
  customer: string;
  order: string;
  paymentMethod: string;
  app: string;
  createdBy: string;
}
