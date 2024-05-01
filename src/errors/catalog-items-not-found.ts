import { NotFoundException } from '@nestjs/common';

export class CatalogItemsNotFoundException extends NotFoundException {
  constructor() {
    super('catalogItemsNotFound');
  }
}
