export interface CreateProductDTO {
  parent: string;
  name: string;
  description?: string;
  app: string;
  avatar?: string;
  catalogs?: string[];
  createdBy: string;
}
