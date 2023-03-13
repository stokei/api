import { CountSortedItemsRepository } from './count-sorted-items';
import { CreateSortedItemRepository } from './create-sorted-item';
import { FindAllSortedItemsRepository } from './find-all-sorted-items';
import { FindMaxIndexSortedItemRepository } from './find-max-index-sorted-item';
import { FindSortedItemByIdRepository } from './find-sorted-item-by-id';
import { RemoveSortedItemRepository } from './remove-sorted-item';
import { UpdateSortedItemRepository } from './update-sorted-item';

export const SortedItemsRepositories = [
  CountSortedItemsRepository,
  CreateSortedItemRepository,
  FindSortedItemByIdRepository,
  FindAllSortedItemsRepository,
  RemoveSortedItemRepository,
  FindMaxIndexSortedItemRepository,
  UpdateSortedItemRepository
];
