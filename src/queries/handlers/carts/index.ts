import { FindAllCartsQueryHandler } from './find-all-carts';
import { FindCartByIdQueryHandler } from './find-cart-by-id';

export const CartQueriesHandlers = [
  FindCartByIdQueryHandler,
  FindAllCartsQueryHandler
];
