import { NotFoundException } from '@nestjs/common';

export class PhoneNotFoundException extends NotFoundException {
  constructor() {
    super('phoneNotFound');
  }
}
