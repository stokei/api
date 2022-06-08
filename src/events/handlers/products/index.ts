import { ProductCreatedHandler } from './product-created.handler';
import { ProductUpdatedHandler } from './product-updated.handler';
import { ProductRemovedHandler } from './product-removed.handler';

export const ProductEventsHandlers = [
  ProductCreatedHandler,
  ProductUpdatedHandler,
  ProductRemovedHandler
];
