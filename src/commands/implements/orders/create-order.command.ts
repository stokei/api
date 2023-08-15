import { ICommand } from '@nestjs/cqrs';

import { CreateOrderDTO } from '@/dtos/orders/create-order.dto';

export class CreateOrderCommand implements ICommand, CreateOrderDTO {
  parent: string;
  app: string;
  currency: string;
  paidAmount: number;
  totalAmount: number;
  subtotalAmount: number;
  createdBy: string;

  constructor(data: CreateOrderDTO) {
    this.parent = data.parent;
    this.app = data.app;
    this.currency = data.currency;
    this.paidAmount = data.paidAmount;
    this.totalAmount = data.totalAmount;
    this.subtotalAmount = data.subtotalAmount;
    this.createdBy = data.createdBy;
  }
}
