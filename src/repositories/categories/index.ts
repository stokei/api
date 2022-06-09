import { CountCategoriesRepository } from './count-categories';
import { CreateCategoryRepository } from './create-category';
import { ExistsCategoriesRepository } from './exists-categories';
import { FindAllCategoriesRepository } from './find-all-categories';
import { FindCategoryByIdRepository } from './find-category-by-id';
import { RemoveCategoryRepository } from './remove-category';
import { UpdateCategoryRepository } from './update-category';

export const CategoriesRepositories = [
  CountCategoriesRepository,
  CreateCategoryRepository,
  ExistsCategoriesRepository,
  FindCategoryByIdRepository,
  FindAllCategoriesRepository,
  RemoveCategoryRepository,
  UpdateCategoryRepository
];
