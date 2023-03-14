import { SortedItemAppResolver } from './app';
import { SortedItemCreatedByResolver } from './created-by';
import { SortedItemItemResolver } from './item';
import { SortedItemReferenceResolver } from './reference';
import { SortedItemUpdatedByResolver } from './updated-by';

export const SortedItemsFieldsResolvers = [
  SortedItemReferenceResolver,
  SortedItemAppResolver,
  SortedItemCreatedByResolver,
  SortedItemUpdatedByResolver,
  SortedItemItemResolver
];
