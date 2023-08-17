import { OrderChangedToPaidHandler } from './order-changed-to-paid.handler';
import { OrderChangedToPaymentErrorHandler } from './order-changed-to-payment-error.handler';
import { OrderCreatedHandler } from './order-created.handler';
import { OrderRemovedHandler } from './order-removed.handler';
import { OrderUpdatedHandler } from './order-updated.handler';

export const OrderEventsHandlers = [
  OrderCreatedHandler,
  OrderUpdatedHandler,
  OrderRemovedHandler,
  OrderChangedToPaymentErrorHandler,
  OrderChangedToPaidHandler
];
