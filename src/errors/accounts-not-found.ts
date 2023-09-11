import { NotFoundException } from '@nestjs/common';

export class AccountsNotFoundException extends NotFoundException {
  constructor() {
    super('accountsNotFound');
  }
}
