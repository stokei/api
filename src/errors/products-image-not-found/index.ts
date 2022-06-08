import { NotFoundException } from '@nestjs/common';

export class ProductsImageNotFoundException extends NotFoundException {
  constructor() {
    super('productsImageNotFound');
  }
}
