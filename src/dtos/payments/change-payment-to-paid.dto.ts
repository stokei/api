export interface ChangePaymentToPaidDTO {
  payment: string;
  paymentMethod?: string;
  app: string;
  updatedBy: string;
}
