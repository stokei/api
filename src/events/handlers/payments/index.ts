import { PaymentChangedToPaidHandler } from './payment-changed-to-paid.handler';
import { PaymentChangedToPaymentErrorHandler } from './payment-changed-to-payment-error.handler';
import { PaymentCreatedHandler } from './payment-created.handler';
import { PaymentRemovedHandler } from './payment-removed.handler';
import { PaymentUpdatedHandler } from './payment-updated.handler';

export const PaymentEventsHandlers = [
  PaymentCreatedHandler,
  PaymentUpdatedHandler,
  PaymentRemovedHandler,
  PaymentChangedToPaymentErrorHandler,
  PaymentChangedToPaidHandler
];
