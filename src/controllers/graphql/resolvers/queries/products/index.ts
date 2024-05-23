import { ProductResolver } from './product';
import { ProductsResolver } from './products';
import { ProductsBestSellerByPeriodResolver } from './products-best-seller';

export const ProductsQueries = [
  ProductResolver,
  ProductsResolver,
  ProductsBestSellerByPeriodResolver
];
