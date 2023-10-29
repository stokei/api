import { FindAllCatalogItemsQueryHandler } from './find-all-catalog-items';
import { FindAllCatalogItemsByCatalogIdsQueryHandler } from './find-all-catalog-items-by-catalog-ids';
import { FindCatalogItemByIdQueryHandler } from './find-catalog-item-by-id';

export const CatalogItemQueriesHandlers = [
  FindCatalogItemByIdQueryHandler,
  FindAllCatalogItemsQueryHandler,
  FindAllCatalogItemsByCatalogIdsQueryHandler
];
