import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { UpdateSubscriptionInput } from '@/controllers/graphql/inputs/subscriptions/update-subscription.input';
import { Subscription } from '@/controllers/graphql/types/subscription';
import { UpdateSubscriptionService } from '@/services/subscriptions/update-subscription';

@Resolver(() => Subscription)
export class UpdateSubscriptionResolver {
  constructor(
    private readonly updateSubscriptionService: UpdateSubscriptionService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Subscription)
  async updateSubscription(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: UpdateSubscriptionInput
  ) {
    const response = await this.updateSubscriptionService.execute({
      ...data,
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
