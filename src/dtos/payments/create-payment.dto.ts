export interface CreatePaymentDTO {
  customer: string;
  order: string;
  paymentMethod: string;
  createdBy: string;
}
