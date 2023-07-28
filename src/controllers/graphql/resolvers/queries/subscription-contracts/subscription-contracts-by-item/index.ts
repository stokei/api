import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllSubscriptionContractsByItemInput,
  WhereDataFindAllSubscriptionContractsByItemInput
} from '@/controllers/graphql/inputs/subscription-contracts/find-all-subscription-contracts-by-item.input';
import { SubscriptionContract } from '@/controllers/graphql/types/subscription-contract';
import { SubscriptionContracts } from '@/controllers/graphql/types/subscription-contracts';
import { FindAllSubscriptionContractsByItemService } from '@/services/subscription-contracts/find-all-subscription-contracts-by-item';

@Resolver(() => SubscriptionContract)
export class SubscriptionContractsByItemResolver {
  constructor(
    private readonly findAllSubscriptionContractsByItemService: FindAllSubscriptionContractsByItemService
  ) {}

  @Query(() => SubscriptionContracts)
  async subscriptionContractsByItem(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllSubscriptionContractsByItemInput,
      nullable: true
    })
    where: WhereDataFindAllSubscriptionContractsByItemInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllSubscriptionContractsByItemInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllSubscriptionContractsByItemInput
  ) {
    return await this.findAllSubscriptionContractsByItemService.execute({
      page,
      where,
      orderBy
    });
  }
}
