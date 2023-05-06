import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreateSubscriptionContractInput } from '@/controllers/graphql/inputs/subscription-contracts/create-subscription-contract.input';
import { SubscriptionContract } from '@/controllers/graphql/types/subscription-contract';
import { CreateSubscriptionContractByAdminService } from '@/services/subscription-contracts/create-subscription-contract-by-admin';

@Resolver(() => SubscriptionContract)
export class CreateSubscriptionContractResolver {
  constructor(
    private readonly createSubscriptionContractByAdminService: CreateSubscriptionContractByAdminService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => SubscriptionContract)
  async createSubscriptionContract(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: CreateSubscriptionContractInput
  ) {
    const response =
      await this.createSubscriptionContractByAdminService.execute({
        ...data,
        app: appId,
        createdBy: currentAccountId
      });
    return response;
  }
}
