import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { FindSubscriptionContractActiveByProductInput } from '@/controllers/graphql/inputs/subscription-contracts/find-subscription-contract-active-by-product.input';
import { SubscriptionContract } from '@/controllers/graphql/types/subscription-contract';
import { FindSubscriptionContractActiveByProductService } from '@/services/subscription-contracts/find-subscription-contract-active-by-product';

@Resolver(() => SubscriptionContract)
export class SubscriptionContractActiveByProductResolver {
  constructor(
    private readonly findSubscriptionContractActiveByProductService: FindSubscriptionContractActiveByProductService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Query(() => SubscriptionContract)
  async subscriptionContractActiveByProduct(
    @Args('input', { type: () => FindSubscriptionContractActiveByProductInput })
    data: FindSubscriptionContractActiveByProductInput,
    @CurrentApp('id') app: string,
    @CurrentAccount('id') customer: string
  ) {
    return await this.findSubscriptionContractActiveByProductService.execute({
      ...data,
      app,
      customer
    });
  }
}
