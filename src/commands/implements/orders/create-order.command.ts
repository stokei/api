import { ICommand } from '@nestjs/cqrs';

import { CreateOrderDTO } from '@/dtos/orders/create-order.dto';

export class CreateOrderCommand implements ICommand, CreateOrderDTO {
  name: string;
  parent: string;
  description?: string;
  app: string;
  createdBy: string;

  constructor(data: CreateOrderDTO) {
    this.name = data.name;
    this.parent = data.parent;
    this.description = data.description;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
