import { ICommand } from '@nestjs/cqrs';

import {
  CreateOrderDTO,
  CreateOrderItemDTO
} from '@/dtos/orders/create-order.dto';

export class CreateOrderCommand implements ICommand, CreateOrderDTO {
  parent: string;
  app: string;
  items: CreateOrderItemDTO[];
  createdBy: string;

  constructor(data: CreateOrderDTO) {
    this.parent = data.parent;
    this.app = data.app;
    this.items = data.items;
    this.createdBy = data.createdBy;
  }
}