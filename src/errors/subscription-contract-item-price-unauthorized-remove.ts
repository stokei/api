import { ForbiddenException } from '@nestjs/common';

export class SubscriptionContractItemPriceUnauthorizedRemoveException extends ForbiddenException {
  constructor() {
    super('subscriptionContractItemPriceUnauthorizedRemove');
  }
}
