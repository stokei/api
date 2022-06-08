import { CheckoutCreatedHandler } from './checkout-created.handler';
import { CheckoutUpdatedHandler } from './checkout-updated.handler';
import { CheckoutRemovedHandler } from './checkout-removed.handler';

export const CheckoutEventsHandlers = [
  CheckoutCreatedHandler,
  CheckoutUpdatedHandler,
  CheckoutRemovedHandler
];
