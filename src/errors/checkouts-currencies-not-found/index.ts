import { NotFoundException } from '@nestjs/common';

export class CheckoutsCurrenciesNotFoundException extends NotFoundException {
  constructor() {
    super('checkoutsCurrenciesNotFound');
  }
}
