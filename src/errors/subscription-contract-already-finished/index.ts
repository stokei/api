import { BadRequestException } from '@nestjs/common';

export class SubscriptionContractAlreadyFinishedException extends BadRequestException {
  constructor() {
    super('subscriptionContractAlreadyFinished');
  }
}
