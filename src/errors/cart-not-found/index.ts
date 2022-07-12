import { NotFoundException } from '@nestjs/common';

export class CartsNotFoundException extends NotFoundException {
  constructor() {
    super('cartsNotFound');
  }
}
