import { ICommand } from '@nestjs/cqrs';
import { CreateCartsItemDTO } from '@/dtos/carts-items/create-carts-item.dto';

export class CreateCartsItemCommand implements ICommand, CreateCartsItemDTO {
  name: string;
  parent: string;

  constructor(data: CreateCartsItemDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
