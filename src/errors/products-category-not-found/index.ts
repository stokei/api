import { NotFoundException } from '@nestjs/common';

export class ProductsCategoryNotFoundException extends NotFoundException {
  constructor() {
    super('productsCategoryNotFound');
  }
}
