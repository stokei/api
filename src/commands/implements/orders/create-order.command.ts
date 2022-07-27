import { ICommand } from '@nestjs/cqrs';

import { CreateOrderDTO } from '@/dtos/orders/create-order.dto';

export class CreateOrderCommand implements ICommand, CreateOrderDTO {
  app: string;
  cart: string;
  customer: string;
  createdBy: string;

  constructor(data: CreateOrderDTO) {
    this.app = data.app;
    this.cart = data.cart;
    this.customer = data.customer;
    this.createdBy = data.createdBy;
  }
}
