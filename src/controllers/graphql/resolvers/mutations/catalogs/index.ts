import { CreateCatalogResolver } from './create-catalog';
import { RemoveCatalogResolver } from './remove-catalog';
import { UpdateCatalogResolver } from './update-catalog';

export const CatalogsMutations = [
  CreateCatalogResolver,
  RemoveCatalogResolver,
  UpdateCatalogResolver
];
