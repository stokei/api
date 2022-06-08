import { CurrencyCreatedHandler } from './currency-created.handler';
import { CurrencyUpdatedHandler } from './currency-updated.handler';
import { CurrencyRemovedHandler } from './currency-removed.handler';

export const CurrencyEventsHandlers = [
  CurrencyCreatedHandler,
  CurrencyUpdatedHandler,
  CurrencyRemovedHandler
];
