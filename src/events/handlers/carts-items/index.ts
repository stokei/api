import { CartsItemCreatedHandler } from './carts-item-created.handler';
import { CartsItemUpdatedHandler } from './carts-item-updated.handler';
import { CartsItemRemovedHandler } from './carts-item-removed.handler';

export const CartsItemEventsHandlers = [
  CartsItemCreatedHandler,
  CartsItemUpdatedHandler,
  CartsItemRemovedHandler
];
