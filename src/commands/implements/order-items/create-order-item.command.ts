import { ICommand } from '@nestjs/cqrs';

import { CreateOrderItemDTO } from '@/dtos/order-items/create-order-item.dto';

export class CreateOrderItemCommand implements ICommand, CreateOrderItemDTO {
  order: string;
  product: string;
  price: string;
  quantity: number;
  app: string;
  createdBy: string;

  constructor(data: CreateOrderItemDTO) {
    this.order = data.order;
    this.product = data.product;
    this.price = data.price;
    this.quantity = data.quantity;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
