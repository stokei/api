import { CreateCategoryCommandHandler } from './create-category';
import { RemoveCategoryCommandHandler } from './remove-category';
import { UpdateCategoryCommandHandler } from './update-category';

export const CategoryCommandHandlers = [
  CreateCategoryCommandHandler,
  RemoveCategoryCommandHandler,
  UpdateCategoryCommandHandler
];
