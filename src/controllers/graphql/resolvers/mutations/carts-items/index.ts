import { CreateCartsItemResolver } from './create-carts-item';
import { RemoveCartsItemResolver } from './remove-carts-item';
import { UpdateCartsItemResolver } from './update-carts-item';

export const CartsItemsMutations = [
  CreateCartsItemResolver,
  RemoveCartsItemResolver,
  UpdateCartsItemResolver
];
