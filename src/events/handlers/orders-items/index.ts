import { OrdersItemCreatedHandler } from './orders-item-created.handler';
import { OrdersItemRemovedHandler } from './orders-item-removed.handler';
import { OrdersItemUpdatedHandler } from './orders-item-updated.handler';

export const OrdersItemEventsHandlers = [
  OrdersItemCreatedHandler,
  OrdersItemUpdatedHandler,
  OrdersItemRemovedHandler
];
