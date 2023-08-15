import { NotFoundException } from '@nestjs/common';

export class OrderItemNotFoundException extends NotFoundException {
  constructor() {
    super('orderItemNotFound');
  }
}
