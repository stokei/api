import { NotFoundException } from '@nestjs/common';

export class SubscriptionContractItemNotFoundException extends NotFoundException {
  constructor() {
    super('subscriptionContractItemNotFound');
  }
}
