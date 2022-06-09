import { CurrencyCreatedHandler } from './currency-created.handler';
import { CurrencyRemovedHandler } from './currency-removed.handler';
import { CurrencyUpdatedHandler } from './currency-updated.handler';

export const CurrencyEventsHandlers = [
  CurrencyCreatedHandler,
  CurrencyUpdatedHandler,
  CurrencyRemovedHandler
];
