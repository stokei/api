import { CartCreatedHandler } from './cart-created.handler';
import { CartUpdatedHandler } from './cart-updated.handler';
import { CartRemovedHandler } from './cart-removed.handler';

export const CartEventsHandlers = [
  CartCreatedHandler,
  CartUpdatedHandler,
  CartRemovedHandler
];
