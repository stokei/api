import { BadRequestException } from '@nestjs/common';

export class CartItemAlreadyExistsException extends BadRequestException {
  constructor() {
    super('cartItemAlreadyExists');
  }
}
