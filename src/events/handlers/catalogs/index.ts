import { CatalogCreatedHandler } from './catalog-created.handler';
import { CatalogRemovedHandler } from './catalog-removed.handler';
import { CatalogUpdatedHandler } from './catalog-updated.handler';

export const CatalogEventsHandlers = [
  CatalogCreatedHandler,
  CatalogUpdatedHandler,
  CatalogRemovedHandler
];
