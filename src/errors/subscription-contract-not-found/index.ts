import { NotFoundException } from '@nestjs/common';

export class SubscriptionContractNotFoundException extends NotFoundException {
  constructor() {
    super('subscriptionContractNotFound');
  }
}
