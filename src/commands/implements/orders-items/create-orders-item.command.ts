import { ICommand } from '@nestjs/cqrs';
import { CreateOrdersItemDTO } from '@/dtos/orders-items/create-orders-item.dto';

export class CreateOrdersItemCommand implements ICommand, CreateOrdersItemDTO {
  name: string;
  parent: string;

  constructor(data: CreateOrdersItemDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
