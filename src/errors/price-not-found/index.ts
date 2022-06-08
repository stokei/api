import { NotFoundException } from '@nestjs/common';

export class PriceNotFoundException extends NotFoundException {
  constructor() {
    super('priceNotFound');
  }
}
