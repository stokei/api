import { BadRequestException } from '@nestjs/common';

export class PaymentMethodAlreadyExistsException extends BadRequestException {
  constructor() {
    super('paymentMethodAlreadyExists');
  }
}
