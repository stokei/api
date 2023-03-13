import { ICommand } from '@nestjs/cqrs';

import {
  RemoveSortedItemDTO,
  RemoveSortedItemWhereDTO
} from '@/dtos/sorted-items/remove-sorted-item.dto';

export class RemoveSortedItemCommand implements ICommand, RemoveSortedItemDTO {
  where: RemoveSortedItemWhereDTO;
  constructor(data: RemoveSortedItemDTO) {
    this.where = data.where;
  }
}
