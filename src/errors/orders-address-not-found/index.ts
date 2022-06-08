import { NotFoundException } from '@nestjs/common';

export class OrdersAddressNotFoundException extends NotFoundException {
  constructor() {
    super('ordersAddressNotFound');
  }
}
