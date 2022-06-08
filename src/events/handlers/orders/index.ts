import { OrderCreatedHandler } from './order-created.handler';
import { OrderUpdatedHandler } from './order-updated.handler';
import { OrderRemovedHandler } from './order-removed.handler';

export const OrderEventsHandlers = [
  OrderCreatedHandler,
  OrderUpdatedHandler,
  OrderRemovedHandler
];
