import { NotFoundException } from '@nestjs/common';

export class OrdersSellersNotFoundException extends NotFoundException {
  constructor() {
    super('ordersSellersNotFound');
  }
}
