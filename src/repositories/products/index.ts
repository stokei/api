import { CountProductsRepository } from './count-products';
import { CreateProductRepository } from './create-product';
import { ExistsProductsRepository } from './exists-products';
import { FindProductByIdRepository } from './find-product-by-id';
import { FindAllProductsRepository } from './find-all-products';
import { RemoveProductRepository } from './remove-product';
import { UpdateProductRepository } from './update-product';

export const ProductsRepositories = [
  CountProductsRepository,
  CreateProductRepository,
  ExistsProductsRepository,
  FindProductByIdRepository,
  FindAllProductsRepository,
  RemoveProductRepository,
  UpdateProductRepository
];
