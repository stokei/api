import { ICommand } from '@nestjs/cqrs';

import {
  UpdateSortedItemDataDTO,
  UpdateSortedItemDTO,
  UpdateSortedItemWhereDTO
} from '@/dtos/sorted-items/update-sorted-item.dto';

export class UpdateSortedItemCommand implements ICommand, UpdateSortedItemDTO {
  data: UpdateSortedItemDataDTO;
  where: UpdateSortedItemWhereDTO;
  constructor(data: UpdateSortedItemDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
