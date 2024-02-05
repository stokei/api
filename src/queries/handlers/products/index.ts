import { FindAllProductsQueryHandler } from './find-all-products';
import { FindProductByIdQueryHandler } from './find-product-by-id';

export const ProductQueriesHandlers = [
  FindProductByIdQueryHandler,
  FindAllProductsQueryHandler
];
