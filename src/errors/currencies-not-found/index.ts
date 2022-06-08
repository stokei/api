import { NotFoundException } from '@nestjs/common';

export class CurrenciesNotFoundException extends NotFoundException {
  constructor() {
    super('currenciesNotFound');
  }
}
