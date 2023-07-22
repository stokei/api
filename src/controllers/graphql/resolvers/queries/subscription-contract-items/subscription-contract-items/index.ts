import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllSubscriptionContractItemsInput,
  WhereDataFindAllSubscriptionContractItemsInput
} from '@/controllers/graphql/inputs/subscription-contract-items/find-all-subscription-contract-items.input';
import { SubscriptionContractItem } from '@/controllers/graphql/types/subscription-contract-item';
import { SubscriptionContractItems } from '@/controllers/graphql/types/subscription-contract-items';
import { FindAllSubscriptionContractItemsService } from '@/services/subscription-contract-items/find-all-subscription-contract-items';

@Resolver(() => SubscriptionContractItem)
export class SubscriptionContractItemsResolver {
  constructor(
    private readonly findAllSubscriptionContractItemsService: FindAllSubscriptionContractItemsService
  ) {}

  @Query(() => SubscriptionContractItems)
  async subscriptionContractItems(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllSubscriptionContractItemsInput,
      nullable: true
    })
    where: WhereDataFindAllSubscriptionContractItemsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllSubscriptionContractItemsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllSubscriptionContractItemsInput
  ) {
    return await this.findAllSubscriptionContractItemsService.execute({
      page,
      where,
      orderBy
    });
  }
}
