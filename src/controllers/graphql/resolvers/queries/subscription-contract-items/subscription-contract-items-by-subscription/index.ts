import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllSubscriptionContractItemsBySubscriptionInput,
  WhereDataFindAllSubscriptionContractItemsBySubscriptionInput
} from '@/controllers/graphql/inputs/subscription-contracts/find-all-subscription-contracts-by-item.input';
import { SubscriptionContractItem } from '@/controllers/graphql/types/subscription-contract-item';
import { SubscriptionContractItems } from '@/controllers/graphql/types/subscription-contract-items';
import { FindAllSubscriptionContractItemsBySubscriptionService } from '@/services/subscription-contract-items/find-all-subscription-contract-items-by-subscription';

@Resolver(() => SubscriptionContractItem)
export class SubscriptionContractItemsBySubscriptionResolver {
  constructor(
    private readonly findAllSubscriptionContractItemsBySubscriptionService: FindAllSubscriptionContractItemsBySubscriptionService
  ) {}

  @Query(() => SubscriptionContractItems)
  async subscriptionContractItemsBySubscription(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllSubscriptionContractItemsBySubscriptionInput,
      nullable: true
    })
    where: WhereDataFindAllSubscriptionContractItemsBySubscriptionInput,
    @Args('orderBy', {
      type: () =>
        OrderByDataFindAllSubscriptionContractItemsBySubscriptionInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllSubscriptionContractItemsBySubscriptionInput
  ) {
    return await this.findAllSubscriptionContractItemsBySubscriptionService.execute(
      {
        page,
        where,
        orderBy
      }
    );
  }
}
