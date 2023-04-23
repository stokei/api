import { ChangeFromSortedItemToSortedItemCommandHandler } from './change-from-sorted-item-to-sorted-item';
import { CreateSortedItemCommandHandler } from './create-sorted-item';
import { RemoveSortedItemCommandHandler } from './remove-sorted-item';
import { UpdateSortedItemCommandHandler } from './update-sorted-item';

export const SortedItemCommandHandlers = [
  CreateSortedItemCommandHandler,
  RemoveSortedItemCommandHandler,
  UpdateSortedItemCommandHandler,
  ChangeFromSortedItemToSortedItemCommandHandler
];
