import { NotFoundException } from '@nestjs/common';

export class CatalogsNotFoundException extends NotFoundException {
  constructor() {
    super('catalogsNotFound');
  }
}
