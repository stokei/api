import { ICommand } from '@nestjs/cqrs';

import { CreateOrderDTO } from '@/dtos/orders/create-order.dto';

export class CreateOrderCommand implements ICommand, CreateOrderDTO {
  project: string;
  cart: string;
  customer: string;
  currency: string;
  createdBy: string;

  constructor(data: CreateOrderDTO) {
    this.project = data.project;
    this.cart = data.cart;
    this.customer = data.customer;
    this.currency = data.currency;
    this.createdBy = data.createdBy;
  }
}
