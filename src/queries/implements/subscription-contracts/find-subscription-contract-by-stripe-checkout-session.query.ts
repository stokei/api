import { IQuery } from '@nestjs/cqrs';

export class FindSubscriptionContractByStripeCheckoutSessionQuery
  implements IQuery
{
  constructor(readonly stripeCheckoutSession: string) {}
}
