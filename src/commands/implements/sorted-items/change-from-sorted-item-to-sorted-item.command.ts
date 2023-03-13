import { ICommand } from '@nestjs/cqrs';

import { ChangeFromSortedItemToSortedItemDTO } from '@/dtos/sorted-items/change-from-sorted-item-to-sorted-item.dto';

export class ChangeFromSortedItemToSortedItemCommand
  implements ICommand, ChangeFromSortedItemToSortedItemDTO
{
  fromItem: string;
  toItem: string;
  app: string;
  updatedBy: string;

  constructor(data: ChangeFromSortedItemToSortedItemDTO) {
    this.fromItem = data.fromItem;
    this.toItem = data.toItem;
    this.app = data.app;
    this.updatedBy = data.updatedBy;
  }
}
