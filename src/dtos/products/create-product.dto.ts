export interface CreateProductDTO {
  parent: string;
  name: string;
  description?: string;
  app: string;
  avatar?: string;
  createdBy: string;
}
