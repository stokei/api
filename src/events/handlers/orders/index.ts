import { OrderCreatedHandler } from './order-created.handler';
import { OrderRemovedHandler } from './order-removed.handler';
import { OrderUpdatedHandler } from './order-updated.handler';

export const OrderEventsHandlers = [
  OrderCreatedHandler,
  OrderUpdatedHandler,
  OrderRemovedHandler
];
