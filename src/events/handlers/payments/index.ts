import { PaymentCreatedHandler } from './payment-created.handler';
import { PaymentUpdatedHandler } from './payment-updated.handler';
import { PaymentRemovedHandler } from './payment-removed.handler';

export const PaymentEventsHandlers = [
  PaymentCreatedHandler,
  PaymentUpdatedHandler,
  PaymentRemovedHandler
];
