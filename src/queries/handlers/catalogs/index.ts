import { FindAllCatalogsQueryHandler } from './find-all-catalogs';
import { FindCatalogByIdQueryHandler } from './find-catalog-by-id';

export const CatalogQueriesHandlers = [
  FindCatalogByIdQueryHandler,
  FindAllCatalogsQueryHandler
];
