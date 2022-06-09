import { ProductCreatedHandler } from './product-created.handler';
import { ProductRemovedHandler } from './product-removed.handler';
import { ProductUpdatedHandler } from './product-updated.handler';

export const ProductEventsHandlers = [
  ProductCreatedHandler,
  ProductUpdatedHandler,
  ProductRemovedHandler
];
