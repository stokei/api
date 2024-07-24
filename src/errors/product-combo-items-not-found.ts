import { NotFoundException } from '@nestjs/common';

export class ProductComboItemsNotFoundException extends NotFoundException {
  constructor() {
    super('productComboItemsNotFound');
  }
}
