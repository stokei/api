import { BadRequestException } from '@nestjs/common';

export class StripeCustomerAlreadyExistsException extends BadRequestException {
  constructor() {
    super('stripeCustomerAlreadyExists');
  }
}
