import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllSubscriptionContractsInput,
  WhereDataFindAllSubscriptionContractsInput
} from '@/controllers/graphql/inputs/subscription-contracts/find-all-subscription-contracts.input';
import { SubscriptionContract } from '@/controllers/graphql/types/subscription-contract';
import { SubscriptionContracts } from '@/controllers/graphql/types/subscription-contracts';
import { FindAllSubscriptionContractsService } from '@/services/subscription-contracts/find-all-subscription-contracts';

@Resolver(() => SubscriptionContract)
export class SubscriptionContractsResolver {
  constructor(
    private readonly findAllSubscriptionContractsService: FindAllSubscriptionContractsService
  ) {}

  @Query(() => SubscriptionContracts)
  async subscriptionContracts(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllSubscriptionContractsInput,
      nullable: true
    })
    where: WhereDataFindAllSubscriptionContractsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllSubscriptionContractsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllSubscriptionContractsInput
  ) {
    return await this.findAllSubscriptionContractsService.execute({
      page,
      where,
      orderBy
    });
  }
}
