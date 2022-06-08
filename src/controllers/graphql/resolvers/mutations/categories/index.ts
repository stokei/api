import { CreateCategoryResolver } from './create-category';
import { RemoveCategoryResolver } from './remove-category';
import { UpdateCategoryResolver } from './update-category';

export const CategoriesMutations = [
  CreateCategoryResolver,
  RemoveCategoryResolver,
  UpdateCategoryResolver
];
