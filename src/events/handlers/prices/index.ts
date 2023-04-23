import { PriceActivatedHandler } from './price-activated.handler';
import { PriceCreatedHandler } from './price-created.handler';
import { PriceDeactivatedHandler } from './price-deactivated.handler';
import { PriceRemovedHandler } from './price-removed.handler';
import { PriceUpdatedHandler } from './price-updated.handler';

export const PriceEventsHandlers = [
  PriceCreatedHandler,
  PriceUpdatedHandler,
  PriceRemovedHandler,
  PriceActivatedHandler,
  PriceDeactivatedHandler
];
