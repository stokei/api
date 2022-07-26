export interface CreateProductDTO {
  parent: string;
  name: string;
  description?: string;
  app: string;
  checkoutVisible: boolean;
  avatar?: string;
  createdBy: string;
}
