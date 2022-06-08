import { FindCategoryByIdService } from './find-category-by-id';
import { FindAllCategoriesService } from './find-all-categories';
import { CreateCategoryService } from './create-category';
import { RemoveCategoryService } from './remove-category';
import { UpdateCategoryService } from './update-category';

export const CategoryServices = [
  CreateCategoryService,
  RemoveCategoryService,
  UpdateCategoryService,
  FindCategoryByIdService,
  FindAllCategoriesService
];
