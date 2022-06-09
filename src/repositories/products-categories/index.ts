import { CountProductsCategoriesRepository } from './count-products-categories';
import { CreateProductsCategoryRepository } from './create-products-category';
import { ExistsProductsCategoriesRepository } from './exists-products-categories';
import { FindAllProductsCategoriesRepository } from './find-all-products-categories';
import { FindProductsCategoryByIdRepository } from './find-products-category-by-id';
import { RemoveProductsCategoryRepository } from './remove-products-category';
import { UpdateProductsCategoryRepository } from './update-products-category';

export const ProductsCategoriesRepositories = [
  CountProductsCategoriesRepository,
  CreateProductsCategoryRepository,
  ExistsProductsCategoriesRepository,
  FindProductsCategoryByIdRepository,
  FindAllProductsCategoriesRepository,
  RemoveProductsCategoryRepository,
  UpdateProductsCategoryRepository
];
