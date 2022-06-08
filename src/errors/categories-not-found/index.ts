import { NotFoundException } from '@nestjs/common';

export class CategoriesNotFoundException extends NotFoundException {
  constructor() {
    super('categoriesNotFound');
  }
}
