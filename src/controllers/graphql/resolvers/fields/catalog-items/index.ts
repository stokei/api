import { CatalogItemAppResolver } from './app';
import { CatalogItemCreatedByResolver } from './created-by';
import { CatalogItemCatalogResolver } from './product';
import { CatalogItemReferenceResolver } from './reference';
import { CatalogItemUpdatedByResolver } from './updated-by';

export const CatalogItemsFieldsResolvers = [
  CatalogItemReferenceResolver,
  CatalogItemAppResolver,
  CatalogItemCatalogResolver,
  CatalogItemCreatedByResolver,
  CatalogItemUpdatedByResolver
];
