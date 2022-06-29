import { ICommand } from '@nestjs/cqrs';

import { CreateCartsItemDTO } from '@/dtos/carts-items/create-carts-item.dto';

export class CreateCartsItemCommand implements ICommand, CreateCartsItemDTO {
  name: string;
  parent: string;
  createdBy: string;

  constructor(data: CreateCartsItemDTO) {
    this.name = data.name;
    this.parent = data.parent;
    this.createdBy = data.createdBy;
  }
}
