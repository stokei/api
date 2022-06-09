import { FindAllProductsCategoriesQueryHandler } from './find-all-products-categories';
import { FindProductsCategoryByIdQueryHandler } from './find-products-category-by-id';

export const ProductsCategoryQueriesHandlers = [
  FindProductsCategoryByIdQueryHandler,
  FindAllProductsCategoriesQueryHandler
];
