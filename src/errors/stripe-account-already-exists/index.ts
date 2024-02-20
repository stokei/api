import { BadRequestException } from '@nestjs/common';

export class StripeAccountAlreadyExistsException extends BadRequestException {
  constructor() {
    super('stripeAccountAlreadyExists');
  }
}
