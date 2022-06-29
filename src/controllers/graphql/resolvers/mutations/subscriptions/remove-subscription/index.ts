import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { RemoveSubscriptionInput } from '@/controllers/graphql/inputs/subscriptions/remove-subscription.input';
import { Subscription } from '@/controllers/graphql/types/subscription';
import { RemoveSubscriptionService } from '@/services/subscriptions/remove-subscription';

@Resolver(() => Subscription)
export class RemoveSubscriptionResolver {
  constructor(
    private readonly removeSubscriptionService: RemoveSubscriptionService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Subscription)
  async removeSubscription(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: RemoveSubscriptionInput
  ) {
    const response = await this.removeSubscriptionService.execute({
      ...data,
      where: {
        ...data?.where,
        removedBy: currentAccountId
      }
    });
    return response;
  }
}
