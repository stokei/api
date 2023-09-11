import { NotFoundException } from '@nestjs/common';

export class AddressesNotFoundException extends NotFoundException {
  constructor() {
    super('addressesNotFound');
  }
}
