import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue } from '@stokei/nestjs';

import {
  DataNotFoundException,
  ParamNotFoundException,
  SubscriptionContractNotFoundException
} from '@/errors';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';
import { FindSubscriptionContractByStripeCheckoutSessionQuery } from '@/queries/implements/subscription-contracts/find-subscription-contract-by-stripe-checkout-session.query';
import { FindSubscriptionContractByStripeCheckoutSessionRepository } from '@/repositories/subscription-contracts/find-subscription-contract-by-stripe-checkout-session';

@QueryHandler(FindSubscriptionContractByStripeCheckoutSessionQuery)
export class FindSubscriptionContractByStripeCheckoutSessionQueryHandler
  implements
    IQueryHandler<FindSubscriptionContractByStripeCheckoutSessionQuery>
{
  constructor(
    private readonly findSubscriptionContractByStripeCheckoutSessionRepository: FindSubscriptionContractByStripeCheckoutSessionRepository
  ) {}

  async execute(
    query: FindSubscriptionContractByStripeCheckoutSessionQuery
  ): Promise<SubscriptionContractModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const stripeCheckoutSession = cleanValue(query.stripeCheckoutSession);
    if (!stripeCheckoutSession) {
      throw new ParamNotFoundException('stripeCheckoutSession');
    }

    const subscriptionContract =
      await this.findSubscriptionContractByStripeCheckoutSessionRepository.execute(
        stripeCheckoutSession
      );
    if (!subscriptionContract) {
      throw new SubscriptionContractNotFoundException();
    }
    return subscriptionContract;
  }
}
