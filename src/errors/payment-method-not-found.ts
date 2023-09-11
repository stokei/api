import { NotFoundException } from '@nestjs/common';

export class PaymentMethodNotFoundException extends NotFoundException {
  constructor() {
    super('paymentMethodNotFound');
  }
}
