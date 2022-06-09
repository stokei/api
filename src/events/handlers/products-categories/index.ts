import { ProductsCategoryCreatedHandler } from './products-category-created.handler';
import { ProductsCategoryRemovedHandler } from './products-category-removed.handler';
import { ProductsCategoryUpdatedHandler } from './products-category-updated.handler';

export const ProductsCategoryEventsHandlers = [
  ProductsCategoryCreatedHandler,
  ProductsCategoryUpdatedHandler,
  ProductsCategoryRemovedHandler
];
