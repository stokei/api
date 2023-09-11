import { NotFoundException } from '@nestjs/common';

export class PaymentsNotFoundException extends NotFoundException {
  constructor() {
    super('paymentsNotFound');
  }
}
