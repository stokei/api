import { NotFoundException } from '@nestjs/common';

export class ProductsTagsNotFoundException extends NotFoundException {
  constructor() {
    super('productsTagsNotFound');
  }
}
