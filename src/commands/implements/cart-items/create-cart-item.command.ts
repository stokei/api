import { ICommand } from '@nestjs/cqrs';

import { CreateCartItemDTO } from '@/dtos/cart-items/create-cart-item.dto';

export class CreateCartItemCommand implements ICommand, CreateCartItemDTO {
  parent: string;
  price: string;
  quantity?: number;
  app: string;
  createdBy: string;

  constructor(data: CreateCartItemDTO) {
    this.parent = data.parent;
    this.price = data.price;
    this.quantity = data.quantity;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
