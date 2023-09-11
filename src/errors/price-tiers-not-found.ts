import { NotFoundException } from '@nestjs/common';

export class PriceTiersNotFoundException extends NotFoundException {
  constructor() {
    super('priceTiersNotFound');
  }
}
