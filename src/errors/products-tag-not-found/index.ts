import { NotFoundException } from '@nestjs/common';

export class ProductsTagNotFoundException extends NotFoundException {
  constructor() {
    super('productsTagNotFound');
  }
}
