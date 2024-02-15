import { BadRequestException } from '@nestjs/common';

export class StripeAccountNotFoundException extends BadRequestException {
  constructor() {
    super('stripeAccountNotFound');
  }
}
