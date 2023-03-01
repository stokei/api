import { CatalogAppResolver } from './app';
import { CatalogCreatedByResolver } from './created-by';
import { CatalogReferenceResolver } from './reference';
import { CatalogUpdatedByResolver } from './updated-by';

export const CatalogsFieldsResolvers = [
  CatalogReferenceResolver,
  CatalogAppResolver,
  CatalogCreatedByResolver,
  CatalogUpdatedByResolver
];
