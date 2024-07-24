import { NotFoundException } from '@nestjs/common';

export class ProductComboItemNotFoundException extends NotFoundException {
  constructor() {
    super('productComboItemNotFound');
  }
}
