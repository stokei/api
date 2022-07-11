import { NotFoundException } from '@nestjs/common';

export class PaymentMethodsNotFoundException extends NotFoundException {
  constructor() {
    super('paymentMethodsNotFound');
  }
}
