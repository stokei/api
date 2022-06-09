import { CartCreatedHandler } from './cart-created.handler';
import { CartRemovedHandler } from './cart-removed.handler';
import { CartUpdatedHandler } from './cart-updated.handler';

export const CartEventsHandlers = [
  CartCreatedHandler,
  CartUpdatedHandler,
  CartRemovedHandler
];
