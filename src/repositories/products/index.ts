import { CountProductsRepository } from './count-products';
import { CreateProductRepository } from './create-product';
import { FindAllProductsRepository } from './find-all-products';
import { FindProductByIdRepository } from './find-product-by-id';
import { FindProductsByStripeProductIdsRepository } from './find-products-by-stripe-product-ids';

export const ProductsRepositories = [
  CountProductsRepository,
  CreateProductRepository,
  FindProductByIdRepository,
  FindAllProductsRepository,
  FindProductsByStripeProductIdsRepository
];
