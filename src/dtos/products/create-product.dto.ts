export interface CreateProductDTO {
  parent: string;
  name: string;
  description?: string;
  project: string;
  externalProductId: string;
  checkoutVisible: boolean;
  avatar?: string;
  createdBy: string;
}
