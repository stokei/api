import { CheckoutCreatedHandler } from './checkout-created.handler';
import { CheckoutRemovedHandler } from './checkout-removed.handler';
import { CheckoutUpdatedHandler } from './checkout-updated.handler';

export const CheckoutEventsHandlers = [
  CheckoutCreatedHandler,
  CheckoutUpdatedHandler,
  CheckoutRemovedHandler
];
