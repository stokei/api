import { BadRequestException } from '@nestjs/common';

export class StripeSignatureNotFoundException extends BadRequestException {
  constructor() {
    super('stripeSignatureNotFound');
  }
}
