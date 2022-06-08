import { NotFoundException } from '@nestjs/common';

export class OrdersItemNotFoundException extends NotFoundException {
  constructor() {
    super('ordersItemNotFound');
  }
}
