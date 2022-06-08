import { NotFoundException } from '@nestjs/common';

export class OrdersNotFoundException extends NotFoundException {
  constructor() {
    super('ordersNotFound');
  }
}
