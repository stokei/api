import { NotFoundException } from '@nestjs/common';

export class OrdersItemsNotFoundException extends NotFoundException {
  constructor() {
    super('ordersItemsNotFound');
  }
}
