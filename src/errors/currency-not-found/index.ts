import { NotFoundException } from '@nestjs/common';

export class CurrencyNotFoundException extends NotFoundException {
  constructor() {
    super('currencyNotFound');
  }
}
