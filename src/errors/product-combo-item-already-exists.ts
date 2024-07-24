import { BadRequestException } from '@nestjs/common';

export class ProductComboItemAlreadyExistsException extends BadRequestException {
  constructor() {
    super('productComboItemAlreadyExists');
  }
}
