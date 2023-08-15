export interface CreateOrderDTO {
  parent: string;
  app: string;
  currency: string;
  paidAmount: number;
  totalAmount: number;
  subtotalAmount: number;
  createdBy: string;
}
