import { NotFoundException } from '@nestjs/common';

export class InvoicesNotFoundException extends NotFoundException {
  constructor() {
    super('invoicesNotFound');
  }
}
