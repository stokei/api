import { BadRequestException } from '@nestjs/common';

export class SubscriptionContractAlreadyActiveException extends BadRequestException {
  constructor() {
    super('subscriptionContractAlreadyActive');
  }
}
