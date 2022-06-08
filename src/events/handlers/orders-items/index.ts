import { OrdersItemCreatedHandler } from './orders-item-created.handler';
import { OrdersItemUpdatedHandler } from './orders-item-updated.handler';
import { OrdersItemRemovedHandler } from './orders-item-removed.handler';

export const OrdersItemEventsHandlers = [
  OrdersItemCreatedHandler,
  OrdersItemUpdatedHandler,
  OrdersItemRemovedHandler
];
