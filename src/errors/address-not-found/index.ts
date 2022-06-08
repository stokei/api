import { NotFoundException } from '@nestjs/common';

export class AddressNotFoundException extends NotFoundException {
  constructor() {
    super('addressNotFound');
  }
}
