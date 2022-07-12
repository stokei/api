import { FindAllCartItemsQueryHandler } from './find-all-cart-items';
import { FindCartItemByIdQueryHandler } from './find-cart-item-by-id';

export const CartItemQueriesHandlers = [
  FindCartItemByIdQueryHandler,
  FindAllCartItemsQueryHandler
];
