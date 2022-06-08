import { NotFoundException } from '@nestjs/common';

export class ProductsImagesNotFoundException extends NotFoundException {
  constructor() {
    super('productsImagesNotFound');
  }
}
