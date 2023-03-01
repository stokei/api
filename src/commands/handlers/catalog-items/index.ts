import { CreateCatalogItemCommandHandler } from './create-catalog-item';
import { RemoveCatalogItemCommandHandler } from './remove-catalog-item';

export const CatalogItemCommandHandlers = [
  CreateCatalogItemCommandHandler,
  RemoveCatalogItemCommandHandler
];
