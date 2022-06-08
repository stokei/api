import { ProductsTagCreatedHandler } from './products-tag-created.handler';
import { ProductsTagUpdatedHandler } from './products-tag-updated.handler';
import { ProductsTagRemovedHandler } from './products-tag-removed.handler';

export const ProductsTagEventsHandlers = [
  ProductsTagCreatedHandler,
  ProductsTagUpdatedHandler,
  ProductsTagRemovedHandler
];
