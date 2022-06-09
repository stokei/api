import { FindAllProductsTagsQueryHandler } from './find-all-products-tags';
import { FindProductsTagByIdQueryHandler } from './find-products-tag-by-id';

export const ProductsTagQueriesHandlers = [
  FindProductsTagByIdQueryHandler,
  FindAllProductsTagsQueryHandler
];
