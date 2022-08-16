import { CreateProductDTO } from './create-product.dto';

export interface CreateProductRepositoryDTO extends CreateProductDTO {
  externalProduct: string;
  purchaseUrl: string;
}
