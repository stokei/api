import { CreateCartItemResolver } from './create-cart-item';
import { RemoveCartItemResolver } from './remove-cart-item';

export const CartItemsMutations = [
  CreateCartItemResolver,
  RemoveCartItemResolver
];
