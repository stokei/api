import { ChangeFromSortedItemToSortedItemService } from './change-from-sorted-item-to-sorted-item';
import { CreateSortedItemService } from './create-sorted-item';
import { FindAllSortedItemsService } from './find-all-sorted-items';
import { FindMaxIndexSortedItemService } from './find-max-index-sorted-item';
import { FindSortedItemByIdService } from './find-sorted-item-by-id';
import { RemoveSortedItemService } from './remove-sorted-item';
import { UpdateSortedItemService } from './update-sorted-item';

export const SortedItemServices = [
  CreateSortedItemService,
  RemoveSortedItemService,
  FindSortedItemByIdService,
  FindAllSortedItemsService,
  FindMaxIndexSortedItemService,
  UpdateSortedItemService,
  ChangeFromSortedItemToSortedItemService
];
