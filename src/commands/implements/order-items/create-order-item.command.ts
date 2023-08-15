import { ICommand } from '@nestjs/cqrs';

import { CreateOrderItemDTO } from '@/dtos/order-items/create-order-item.dto';

export class CreateOrderItemCommand implements ICommand, CreateOrderItemDTO {
  parent: string;
  product: string;
  quantity: number;
  price?: string;
  totalAmount: number;
  subtotalAmount: number;
  recurring?: string;
  app: string;
  createdBy: string;

  constructor(data: CreateOrderItemDTO) {
    this.parent = data.parent;
    this.product = data.product;
    this.quantity = data.quantity;
    this.price = data.price;
    this.totalAmount = data.totalAmount;
    this.subtotalAmount = data.subtotalAmount;
    this.recurring = data.recurring;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
