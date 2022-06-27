import { NotFoundException } from '@nestjs/common';

export class SubscriptionsNotFoundException extends NotFoundException {
  constructor() {
    super('subscriptionsNotFound');
  }
}
