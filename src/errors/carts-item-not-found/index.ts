import { NotFoundException } from '@nestjs/common';

export class CartsItemNotFoundException extends NotFoundException {
  constructor() {
    super('cartsItemNotFound');
  }
}
