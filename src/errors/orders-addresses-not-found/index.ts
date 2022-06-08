import { NotFoundException } from '@nestjs/common';

export class OrdersAddressesNotFoundException extends NotFoundException {
  constructor() {
    super('ordersAddressesNotFound');
  }
}
