import { CreateSortedItemDTO } from './create-sorted-item.dto';

export interface CreateSortedItemRepositoryDTO extends CreateSortedItemDTO {
  index: number;
}
