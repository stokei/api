import { NotFoundException } from '@nestjs/common';

export class PhonesNotFoundException extends NotFoundException {
  constructor() {
    super('phonesNotFound');
  }
}
