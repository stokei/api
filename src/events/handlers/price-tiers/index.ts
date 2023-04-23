import { PriceTierCreatedHandler } from './price-tier-created.handler';
import { PriceTierRemovedHandler } from './price-tier-removed.handler';
import { PriceTierUpdatedHandler } from './price-tier-updated.handler';

export const PriceTierEventsHandlers = [
  PriceTierCreatedHandler,
  PriceTierUpdatedHandler,
  PriceTierRemovedHandler
];
