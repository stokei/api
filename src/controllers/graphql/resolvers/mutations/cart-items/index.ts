import { CreateCartItemResolver } from './create-cart-item';
import { RemoveCartItemResolver } from './remove-cart-item';
import { UpdateCartItemResolver } from './update-cart-item';

export const CartItemsMutations = [
  CreateCartItemResolver,
  RemoveCartItemResolver,
  UpdateCartItemResolver
];
