import { FindAllCategoriesQueryHandler } from './find-all-categories';
import { FindCategoryByIdQueryHandler } from './find-category-by-id';

export const CategoryQueriesHandlers = [
  FindCategoryByIdQueryHandler,
  FindAllCategoriesQueryHandler
];
