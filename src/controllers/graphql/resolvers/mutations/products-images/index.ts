import { CreateProductsImageResolver } from './create-products-image';
import { RemoveProductsImageResolver } from './remove-products-image';
import { UpdateProductsImageResolver } from './update-products-image';

export const ProductsImagesMutations = [
  CreateProductsImageResolver,
  RemoveProductsImageResolver,
  UpdateProductsImageResolver
];
