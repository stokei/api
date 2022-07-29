import { NotFoundException } from '@nestjs/common';

export class SubscriptionContractsNotFoundException extends NotFoundException {
  constructor() {
    super('subscriptionContractsNotFound');
  }
}
