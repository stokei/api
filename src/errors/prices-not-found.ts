import { NotFoundException } from '@nestjs/common';

export class PricesNotFoundException extends NotFoundException {
  constructor() {
    super('pricesNotFound');
  }
}
