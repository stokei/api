import { NotFoundException } from '@nestjs/common';

export class CatalogNotFoundException extends NotFoundException {
  constructor() {
    super('catalogNotFound');
  }
}
