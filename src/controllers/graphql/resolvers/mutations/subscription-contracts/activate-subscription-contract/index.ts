import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { ActivateSubscriptionContractInput } from '@/controllers/graphql/inputs/subscription-contracts/activate-subscription-contract.input';
import { SubscriptionContract } from '@/controllers/graphql/types/subscription-contract';
import { ActivateSubscriptionContractService } from '@/services/subscription-contracts/activate-subscription-contract';

@Resolver(() => SubscriptionContract)
export class ActivateSubscriptionContractResolver {
  constructor(
    private readonly activateSubscriptionContractService: ActivateSubscriptionContractService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => SubscriptionContract)
  async activateSubscriptionContract(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: ActivateSubscriptionContractInput
  ) {
    const response = await this.activateSubscriptionContractService.execute({
      ...data,
      app: appId,
      updatedBy: currentAccountId
    });
    return response;
  }
}
