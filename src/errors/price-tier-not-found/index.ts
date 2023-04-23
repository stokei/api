import { NotFoundException } from '@nestjs/common';

export class PriceTierNotFoundException extends NotFoundException {
  constructor() {
    super('priceTierNotFound');
  }
}
