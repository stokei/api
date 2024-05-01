import { ForbiddenException } from '@nestjs/common';

export class SubscriptionContractItemPriceUnauthorizedUpdateException extends ForbiddenException {
  constructor() {
    super('subscriptionContractItemPriceUnauthorizedUpdate');
  }
}
