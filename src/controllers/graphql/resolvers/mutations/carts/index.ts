import { CreateCartResolver } from './create-cart';
import { RemoveCartResolver } from './remove-cart';
import { UpdateCartResolver } from './update-cart';

export const CartsMutations = [
  CreateCartResolver,
  RemoveCartResolver,
  UpdateCartResolver
];
