import { CheckoutsCurrencyCreatedHandler } from './checkouts-currency-created.handler';
import { CheckoutsCurrencyRemovedHandler } from './checkouts-currency-removed.handler';
import { CheckoutsCurrencyUpdatedHandler } from './checkouts-currency-updated.handler';

export const CheckoutsCurrencyEventsHandlers = [
  CheckoutsCurrencyCreatedHandler,
  CheckoutsCurrencyUpdatedHandler,
  CheckoutsCurrencyRemovedHandler
];
