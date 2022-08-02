export interface CreateCartItemDTO {
  parent: string;
  product: string;
  price: string;
  quantity?: number;
  app: string;
  createdBy: string;
}
