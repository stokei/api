import { CountProductsRepository } from './count-products';
import { CreateProductRepository } from './create-product';
import { FindAllProductsRepository } from './find-all-products';
import { FindProductByIdRepository } from './find-product-by-id';
import { FindProductsByStripeProductIdsRepository } from './find-products-by-stripe-product-ids';
import { UpdateProductRepository } from './update-product';

export const ProductsRepositories = [
  CountProductsRepository,
  CreateProductRepository,
  UpdateProductRepository,
  FindProductByIdRepository,
  FindAllProductsRepository,
  FindProductsByStripeProductIdsRepository
];
