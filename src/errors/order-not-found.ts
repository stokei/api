import { NotFoundException } from '@nestjs/common';

export class OrderNotFoundException extends NotFoundException {
  constructor() {
    super('orderNotFound');
  }
}
