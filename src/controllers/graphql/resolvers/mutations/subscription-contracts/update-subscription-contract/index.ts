import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { UpdateSubscriptionContractInput } from '@/controllers/graphql/inputs/subscription-contracts/update-subscription-contract.input';
import { SubscriptionContract } from '@/controllers/graphql/types/subscription-contract';
import { UpdateSubscriptionContractService } from '@/services/subscription-contracts/update-subscription-contract';

@Resolver(() => SubscriptionContract)
export class UpdateSubscriptionContractResolver {
  constructor(
    private readonly updateSubscriptionContractService: UpdateSubscriptionContractService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => SubscriptionContract)
  async updateSubscriptionContract(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: UpdateSubscriptionContractInput
  ) {
    const response = await this.updateSubscriptionContractService.execute({
      where: {
        ...data?.where,
        app: appId
      },
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
