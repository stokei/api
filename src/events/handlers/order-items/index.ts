import { OrderItemCreatedHandler } from './order-item-created.handler';
import { OrderItemRemovedHandler } from './order-item-removed.handler';

export const OrderItemEventsHandlers = [
  OrderItemCreatedHandler,
  OrderItemRemovedHandler
];
