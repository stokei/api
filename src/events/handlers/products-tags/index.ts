import { ProductsTagCreatedHandler } from './products-tag-created.handler';
import { ProductsTagRemovedHandler } from './products-tag-removed.handler';
import { ProductsTagUpdatedHandler } from './products-tag-updated.handler';

export const ProductsTagEventsHandlers = [
  ProductsTagCreatedHandler,
  ProductsTagUpdatedHandler,
  ProductsTagRemovedHandler
];
