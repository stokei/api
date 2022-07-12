import { NotFoundException } from '@nestjs/common';

export class CartItemNotFoundException extends NotFoundException {
  constructor() {
    super('cartItemNotFound');
  }
}
