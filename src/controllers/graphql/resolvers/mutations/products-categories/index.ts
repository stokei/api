import { CreateProductsCategoryResolver } from './create-products-category';
import { RemoveProductsCategoryResolver } from './remove-products-category';
import { UpdateProductsCategoryResolver } from './update-products-category';

export const ProductsCategoriesMutations = [
  CreateProductsCategoryResolver,
  RemoveProductsCategoryResolver,
  UpdateProductsCategoryResolver
];
