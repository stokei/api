import { CreateCatalogItemResolver } from './create-catalog-item';
import { RemoveCatalogItemResolver } from './remove-catalog-item';

export const CatalogItemsMutations = [
  CreateCatalogItemResolver,
  RemoveCatalogItemResolver
];
