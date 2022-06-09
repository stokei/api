import { CartsItemCreatedHandler } from './carts-item-created.handler';
import { CartsItemRemovedHandler } from './carts-item-removed.handler';
import { CartsItemUpdatedHandler } from './carts-item-updated.handler';

export const CartsItemEventsHandlers = [
  CartsItemCreatedHandler,
  CartsItemUpdatedHandler,
  CartsItemRemovedHandler
];
