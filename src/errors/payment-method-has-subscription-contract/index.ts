import { ForbiddenException } from '@nestjs/common';

export class PaymentMethodHasSubscriptionContractException extends ForbiddenException {
  constructor() {
    super('paymentMethodHasSubscriptionContract');
  }
}
