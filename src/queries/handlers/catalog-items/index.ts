import { FindAllCatalogItemsQueryHandler } from './find-all-catalog-items';
import { FindCatalogItemByIdQueryHandler } from './find-catalog-item-by-id';

export const CatalogItemQueriesHandlers = [
  FindCatalogItemByIdQueryHandler,
  FindAllCatalogItemsQueryHandler
];