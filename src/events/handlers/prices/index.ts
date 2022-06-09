import { PriceCreatedHandler } from './price-created.handler';
import { PriceRemovedHandler } from './price-removed.handler';
import { PriceUpdatedHandler } from './price-updated.handler';

export const PriceEventsHandlers = [
  PriceCreatedHandler,
  PriceUpdatedHandler,
  PriceRemovedHandler
];
