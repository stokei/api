import { NotFoundException } from '@nestjs/common';

export class CartItemsNotFoundException extends NotFoundException {
  constructor() {
    super('cartItemsNotFound');
  }
}
