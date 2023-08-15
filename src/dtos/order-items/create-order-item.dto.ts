export interface CreateOrderItemDTO {
  parent: string;
  product: string;
  quantity: number;
  price?: string;
  totalAmount: number;
  subtotalAmount: number;
  recurring?: string;
  app: string;
  createdBy: string;
}
