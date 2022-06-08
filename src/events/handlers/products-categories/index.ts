import { ProductsCategoryCreatedHandler } from './products-category-created.handler';
import { ProductsCategoryUpdatedHandler } from './products-category-updated.handler';
import { ProductsCategoryRemovedHandler } from './products-category-removed.handler';

export const ProductsCategoryEventsHandlers = [
  ProductsCategoryCreatedHandler,
  ProductsCategoryUpdatedHandler,
  ProductsCategoryRemovedHandler
];
