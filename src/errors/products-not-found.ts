import { NotFoundException } from '@nestjs/common';

export class ProductsNotFoundException extends NotFoundException {
  constructor() {
    super('productsNotFound');
  }
}
