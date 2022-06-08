import { CheckoutsCurrencyCreatedHandler } from './checkouts-currency-created.handler';
import { CheckoutsCurrencyUpdatedHandler } from './checkouts-currency-updated.handler';
import { CheckoutsCurrencyRemovedHandler } from './checkouts-currency-removed.handler';

export const CheckoutsCurrencyEventsHandlers = [
  CheckoutsCurrencyCreatedHandler,
  CheckoutsCurrencyUpdatedHandler,
  CheckoutsCurrencyRemovedHandler
];
