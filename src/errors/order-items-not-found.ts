import { NotFoundException } from '@nestjs/common';

export class OrderItemsNotFoundException extends NotFoundException {
  constructor() {
    super('orderItemsNotFound');
  }
}
