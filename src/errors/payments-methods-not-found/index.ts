import { NotFoundException } from '@nestjs/common';

export class PaymentsMethodsNotFoundException extends NotFoundException {
  constructor() {
    super('paymentsMethodsNotFound');
  }
}
