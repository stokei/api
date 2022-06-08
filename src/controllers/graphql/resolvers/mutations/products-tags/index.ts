import { CreateProductsTagResolver } from './create-products-tag';
import { RemoveProductsTagResolver } from './remove-products-tag';
import { UpdateProductsTagResolver } from './update-products-tag';

export const ProductsTagsMutations = [
  CreateProductsTagResolver,
  RemoveProductsTagResolver,
  UpdateProductsTagResolver
];
