export interface CreateOrderItemDTO {
  price: string;
}
export interface CreateOrderDTO {
  parent: string;
  app: string;
  items: CreateOrderItemDTO[];
  createdBy: string;
}
