import { FindAllSortedItemsQueryHandler } from './find-all-sorted-items';
import { FindMaxIndexSortedItemQueryHandler } from './find-max-index-sorted-item';
import { FindSortedItemByIdQueryHandler } from './find-sorted-item-by-id';

export const SortedItemQueriesHandlers = [
  FindSortedItemByIdQueryHandler,
  FindAllSortedItemsQueryHandler,
  FindMaxIndexSortedItemQueryHandler
];
