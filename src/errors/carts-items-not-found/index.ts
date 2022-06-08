import { NotFoundException } from '@nestjs/common';

export class CartsItemsNotFoundException extends NotFoundException {
  constructor() {
    super('cartsItemsNotFound');
  }
}
