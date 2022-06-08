import { CreateProductResolver } from './create-product';
import { RemoveProductResolver } from './remove-product';
import { UpdateProductResolver } from './update-product';

export const ProductsMutations = [
  CreateProductResolver,
  RemoveProductResolver,
  UpdateProductResolver
];
