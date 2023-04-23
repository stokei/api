import { CreateProductResolver } from './create-product';
import { UpdateProductResolver } from './update-product';

export const ProductsMutations = [CreateProductResolver, UpdateProductResolver];
