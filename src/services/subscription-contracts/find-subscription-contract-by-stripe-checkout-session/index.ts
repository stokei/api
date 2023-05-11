import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { SubscriptionContractModel } from '@/models/subscription-contract.model';
import { FindSubscriptionContractByStripeCheckoutSessionQuery } from '@/queries/implements/subscription-contracts/find-subscription-contract-by-stripe-checkout-session.query';

@Injectable()
export class FindSubscriptionContractByStripeCheckoutSessionService
  implements IBaseService<string, Promise<SubscriptionContractModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<SubscriptionContractModel> {
    return await this.queryBus.execute(
      new FindSubscriptionContractByStripeCheckoutSessionQuery(data)
    );
  }
}
