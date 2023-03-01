import { CatalogItemCreatedHandler } from './catalog-item-created.handler';
import { CatalogItemRemovedHandler } from './catalog-item-removed.handler';

export const CatalogItemEventsHandlers = [
  CatalogItemCreatedHandler,
  CatalogItemRemovedHandler
];
