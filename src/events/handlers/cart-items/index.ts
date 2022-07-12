import { CartItemCreatedHandler } from './cart-item-created.handler';
import { CartItemRemovedHandler } from './cart-item-removed.handler';
import { CartItemUpdatedHandler } from './cart-item-updated.handler';

export const CartItemEventsHandlers = [
  CartItemCreatedHandler,
  CartItemUpdatedHandler,
  CartItemRemovedHandler
];
