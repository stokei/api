import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import { OrderByDataFindAllSubscriptionContractItemsInput } from '@/controllers/graphql/inputs/subscription-contract-items/find-all-subscription-contract-items.input';
import { SubscriptionContract } from '@/controllers/graphql/types/subscription-contract';
import { SubscriptionContractItems } from '@/controllers/graphql/types/subscription-contract-items';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';
import { FindAllSubscriptionContractItemsService } from '@/services/subscription-contract-items/find-all-subscription-contract-items';

@Resolver(() => SubscriptionContract)
export class SubscriptionContractSubscriptionContractItemsResolver {
  constructor(
    private readonly findAllSubscriptionContractItemsService: FindAllSubscriptionContractItemsService
  ) {}

  @ResolveField(() => SubscriptionContractItems, { nullable: true })
  items(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllSubscriptionContractItemsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllSubscriptionContractItemsInput,
    @Parent() subscriptionContract: SubscriptionContractModel
  ) {
    return this.findAllSubscriptionContractItemsService.execute({
      page,
      orderBy,
      where: {
        AND: {
          parent: {
            equals: subscriptionContract.id
          }
        }
      }
    });
  }
}
