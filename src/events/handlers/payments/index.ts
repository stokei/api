import { PaymentCreatedHandler } from './payment-created.handler';
import { PaymentRemovedHandler } from './payment-removed.handler';
import { PaymentUpdatedHandler } from './payment-updated.handler';

export const PaymentEventsHandlers = [
  PaymentCreatedHandler,
  PaymentUpdatedHandler,
  PaymentRemovedHandler
];
