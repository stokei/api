import { ProductType } from '@/enums/product-type.enum';

export interface CreateProductDTO {
  parent: string;
  name: string;
  type: ProductType;
  externalReference?: string;
  description?: string;
  app: string;
  avatar?: string;
  catalogs?: string[];
  comboProducts?: string[];
  createdBy: string;
}
