import { BadRequestException } from '@nestjs/common';

export class SubscriptionContractAlreadyCanceledException extends BadRequestException {
  constructor() {
    super('subscriptionContractAlreadyCanceled');
  }
}
