export interface CreateOrderItemDTO {
  price: string;
}
export interface CreateOrderDTO {
  parent: string;
  coupon?: string;
  app: string;
  items: CreateOrderItemDTO[];
  createdBy: string;
}
