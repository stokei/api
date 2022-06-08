import { ProductsImageCreatedHandler } from './products-image-created.handler';
import { ProductsImageUpdatedHandler } from './products-image-updated.handler';
import { ProductsImageRemovedHandler } from './products-image-removed.handler';

export const ProductsImageEventsHandlers = [
  ProductsImageCreatedHandler,
  ProductsImageUpdatedHandler,
  ProductsImageRemovedHandler
];
