export interface CreateOrderItemDTO {
  order: string;
  product: string;
  price: string;
  quantity: number;
  app: string;
  createdBy: string;
}
