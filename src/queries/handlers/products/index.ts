import { FindAllProductsQueryHandler } from './find-all-products';
import { FindProductByIdQueryHandler } from './find-product-by-id';
import { FindProductsBestSellerByPeriodQueryHandler } from './find-products-best-seller-by-period';

export const ProductQueriesHandlers = [
  FindProductByIdQueryHandler,
  FindAllProductsQueryHandler,
  FindProductsBestSellerByPeriodQueryHandler
];
