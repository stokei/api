import { CountProductsRepository } from './count-products';
import { CreateProductRepository } from './create-product';
import { FindAllProductsRepository } from './find-all-products';
import { FindProductByIdRepository } from './find-product-by-id';
import { FindProductsBestSellerByPeriodRepository } from './find-products-best-seller-by-period';
import { UpdateProductRepository } from './update-product';

export const ProductsRepositories = [
  CountProductsRepository,
  CreateProductRepository,
  UpdateProductRepository,
  FindProductByIdRepository,
  FindAllProductsRepository,
  FindProductsBestSellerByPeriodRepository
];
