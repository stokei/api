import { NotFoundException } from '@nestjs/common';

export class CheckoutsCurrencyNotFoundException extends NotFoundException {
  constructor() {
    super('checkoutsCurrencyNotFound');
  }
}
