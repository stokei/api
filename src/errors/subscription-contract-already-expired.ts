import { BadRequestException } from '@nestjs/common';

export class SubscriptionContractAlreadyExpiredException extends BadRequestException {
  constructor() {
    super('subscriptionContractAlreadyExpired');
  }
}
