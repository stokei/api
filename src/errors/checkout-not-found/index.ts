import { NotFoundException } from '@nestjs/common';

export class CheckoutNotFoundException extends NotFoundException {
  constructor() {
    super('checkoutNotFound');
  }
}
