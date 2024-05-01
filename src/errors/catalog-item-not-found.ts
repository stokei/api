import { NotFoundException } from '@nestjs/common';

export class CatalogItemNotFoundException extends NotFoundException {
  constructor() {
    super('catalogItemNotFound');
  }
}
