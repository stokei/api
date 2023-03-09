import { CatalogAppResolver } from './app';
import { CatalogCreatedByResolver } from './created-by';
import { CatalogCatalogItemsResolver } from './items';
import { CatalogReferenceResolver } from './reference';
import { CatalogUpdatedByResolver } from './updated-by';

export const CatalogsFieldsResolvers = [
  CatalogReferenceResolver,
  CatalogAppResolver,
  CatalogCreatedByResolver,
  CatalogUpdatedByResolver,
  CatalogCatalogItemsResolver
];
