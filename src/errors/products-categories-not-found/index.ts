import { NotFoundException } from '@nestjs/common';

export class ProductsCategoriesNotFoundException extends NotFoundException {
  constructor() {
    super('productsCategoriesNotFound');
  }
}
