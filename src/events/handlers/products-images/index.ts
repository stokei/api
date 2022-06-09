import { ProductsImageCreatedHandler } from './products-image-created.handler';
import { ProductsImageRemovedHandler } from './products-image-removed.handler';
import { ProductsImageUpdatedHandler } from './products-image-updated.handler';

export const ProductsImageEventsHandlers = [
  ProductsImageCreatedHandler,
  ProductsImageUpdatedHandler,
  ProductsImageRemovedHandler
];
