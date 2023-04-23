import { IQuery } from '@nestjs/cqrs';

export class FindSubscriptionContractByStripeSubscriptionQuery
  implements IQuery
{
  constructor(readonly stripeSubscription: string) {}
}
