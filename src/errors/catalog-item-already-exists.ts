import { BadRequestException } from '@nestjs/common';

export class CatalogItemAlreadyExistsException extends BadRequestException {
  constructor() {
    super('catalogItemAlreadyExists');
  }
}
