import { NotFoundException } from '@nestjs/common';

export class OrdersSellerNotFoundException extends NotFoundException {
  constructor() {
    super('ordersSellerNotFound');
  }
}
