import { NotFoundException } from '@nestjs/common';

export class SubscriptionContractItemsNotFoundException extends NotFoundException {
  constructor() {
    super('subscriptionContractItemsNotFound');
  }
}
