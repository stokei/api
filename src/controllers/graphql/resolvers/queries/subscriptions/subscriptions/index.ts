import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllSubscriptionsInput,
  WhereDataFindAllSubscriptionsInput
} from '@/controllers/graphql/inputs/subscriptions/find-all-subscriptions.input';
import { Subscription } from '@/controllers/graphql/types/subscription';
import { Subscriptions } from '@/controllers/graphql/types/subscriptions';
import { FindAllSubscriptionsService } from '@/services/subscriptions/find-all-subscriptions';

@Resolver(() => Subscription)
export class SubscriptionsResolver {
  constructor(
    private readonly findAllSubscriptionsService: FindAllSubscriptionsService
  ) {}

  @Query(() => Subscriptions)
  async subscriptions(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllSubscriptionsInput,
      nullable: true
    })
    where: WhereDataFindAllSubscriptionsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllSubscriptionsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllSubscriptionsInput
  ) {
    return await this.findAllSubscriptionsService.execute({
      page,
      where,
      orderBy
    });
  }
}
