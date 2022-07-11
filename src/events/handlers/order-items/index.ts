import { OrderItemCreatedHandler } from './order-item-created.handler';
import { OrderItemRemovedHandler } from './order-item-removed.handler';
import { OrderItemUpdatedHandler } from './order-item-updated.handler';

export const OrderItemEventsHandlers = [
  OrderItemCreatedHandler,
  OrderItemUpdatedHandler,
  OrderItemRemovedHandler
];
