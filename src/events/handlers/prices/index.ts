import { PriceCreatedHandler } from './price-created.handler';
import { PriceUpdatedHandler } from './price-updated.handler';
import { PriceRemovedHandler } from './price-removed.handler';

export const PriceEventsHandlers = [
  PriceCreatedHandler,
  PriceUpdatedHandler,
  PriceRemovedHandler
];
