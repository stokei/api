import { ICommand } from '@nestjs/cqrs';

import { CreateOrderItemDTO } from '@/dtos/order-items/create-order-item.dto';

export class CreateOrderItemCommand implements ICommand, CreateOrderItemDTO {
  name: string;
  parent: string;
  createdBy: string;

  constructor(data: CreateOrderItemDTO) {
    this.name = data.name;
    this.parent = data.parent;
    this.createdBy = data.createdBy;
  }
}
