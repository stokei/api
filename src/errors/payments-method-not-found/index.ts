import { NotFoundException } from '@nestjs/common';

export class PaymentsMethodNotFoundException extends NotFoundException {
  constructor() {
    super('paymentsMethodNotFound');
  }
}
