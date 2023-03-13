import { ICommand } from '@nestjs/cqrs';

import { CreateSortedItemDTO } from '@/dtos/sorted-items/create-sorted-item.dto';

export class CreateSortedItemCommand implements ICommand, CreateSortedItemDTO {
  parent: string;
  item: string;
  app: string;
  createdBy: string;

  constructor(data: CreateSortedItemDTO) {
    this.parent = data.parent;
    this.item = data.item;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
