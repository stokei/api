import { ChangeFromSortedItemToSortedItemResolver } from './change-from-sorted-item-to-sorted-item';
import { CreateSortedItemResolver } from './create-sorted-item';
import { RemoveSortedItemResolver } from './remove-sorted-item';

export const SortedItemsMutations = [
  CreateSortedItemResolver,
  RemoveSortedItemResolver,
  ChangeFromSortedItemToSortedItemResolver
];
