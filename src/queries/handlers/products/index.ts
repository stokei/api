import { FindAllProductsQueryHandler } from './find-all-products';
import { FindProductByIdQueryHandler } from './find-product-by-id';
import { FindProductsByStripeProductIdsQueryHandler } from './find-products-by-stripe-product-ids';

export const ProductQueriesHandlers = [
  FindProductByIdQueryHandler,
  FindAllProductsQueryHandler,
  FindProductsByStripeProductIdsQueryHandler
];
