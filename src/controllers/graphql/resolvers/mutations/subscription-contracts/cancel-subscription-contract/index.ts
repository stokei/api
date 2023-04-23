import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CancelSubscriptionContractInput } from '@/controllers/graphql/inputs/subscription-contracts/cancel-subscription-contract.input';
import { SubscriptionContract } from '@/controllers/graphql/types/subscription-contract';
import { CancelSubscriptionContractService } from '@/services/subscription-contracts/cancel-subscription-contract';

@Resolver(() => SubscriptionContract)
export class CancelSubscriptionContractResolver {
  constructor(
    private readonly cancelSubscriptionContractService: CancelSubscriptionContractService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => SubscriptionContract)
  async cancelSubscriptionContract(
    @CurrentAccount('id') accountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: CancelSubscriptionContractInput
  ) {
    const subscription = await this.cancelSubscriptionContractService.execute({
      app: appId,
      subscriptionContract: data.subscriptionContract,
      updatedBy: accountId
    });
    return subscription;
  }
}
