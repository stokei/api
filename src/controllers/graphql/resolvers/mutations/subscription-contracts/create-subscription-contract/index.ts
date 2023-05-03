import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreateSubscriptionContractInput } from '@/controllers/graphql/inputs/subscription-contracts/create-subscription-contract.input';
import { SubscriptionContract } from '@/controllers/graphql/types/subscription-contract';
import { CreateSubscriptionContractService } from '@/services/subscription-contracts/create-subscription-contract';

@Resolver(() => SubscriptionContract)
export class CreateSubscriptionContractResolver {
  constructor(
    private readonly createSubscriptionContractService: CreateSubscriptionContractService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => SubscriptionContract)
  async createSubscriptionContract(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: CreateSubscriptionContractInput
  ) {
    const response = await this.createSubscriptionContractService.execute({
      ...data,
      stripeSubscription: null,
      createdByAdmin: true,
      automaticRenew: true,
      app: appId,
      createdBy: currentAccountId
    });
    return response;
  }
}
