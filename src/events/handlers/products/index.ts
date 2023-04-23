import { ProductCreatedHandler } from './product-created.handler';
import { ProductUpdatedHandler } from './product-updated.handler';

export const ProductEventsHandlers = [
  ProductCreatedHandler,
  ProductUpdatedHandler
];
