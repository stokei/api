import { ForbiddenException } from '@nestjs/common';

export class PaymentMethodIsUniqueException extends ForbiddenException {
  constructor() {
    super('paymentMethodIsUnique');
  }
}
