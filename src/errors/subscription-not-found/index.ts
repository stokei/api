import { NotFoundException } from '@nestjs/common';

export class SubscriptionNotFoundException extends NotFoundException {
  constructor() {
    super('subscriptionNotFound');
  }
}
