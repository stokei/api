export interface CreateCartItemDTO {
  parent: string;
  price: string;
  quantity?: number;
  app: string;
  createdBy: string;
}
