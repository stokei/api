import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue } from '@stokei/nestjs';

import {
  DataNotFoundException,
  ParamNotFoundException,
  SubscriptionContractNotFoundException
} from '@/errors';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';
import { FindSubscriptionContractByStripeSubscriptionQuery } from '@/queries/implements/subscription-contracts/find-subscription-contract-by-stripe-subscription.query';
import { FindSubscriptionContractByStripeSubscriptionRepository } from '@/repositories/subscription-contracts/find-subscription-contract-by-stripe-subscription';

@QueryHandler(FindSubscriptionContractByStripeSubscriptionQuery)
export class FindSubscriptionContractByStripeSubscriptionQueryHandler
  implements IQueryHandler<FindSubscriptionContractByStripeSubscriptionQuery>
{
  constructor(
    private readonly findSubscriptionContractByStripeSubscriptionRepository: FindSubscriptionContractByStripeSubscriptionRepository
  ) {}

  async execute(
    query: FindSubscriptionContractByStripeSubscriptionQuery
  ): Promise<SubscriptionContractModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const stripeSubscription = cleanValue(query.stripeSubscription);
    if (!stripeSubscription) {
      throw new ParamNotFoundException('stripeSubscription');
    }

    const subscriptionContract =
      await this.findSubscriptionContractByStripeSubscriptionRepository.execute(
        stripeSubscription
      );
    if (!subscriptionContract) {
      throw new SubscriptionContractNotFoundException();
    }
    return subscriptionContract;
  }
}
