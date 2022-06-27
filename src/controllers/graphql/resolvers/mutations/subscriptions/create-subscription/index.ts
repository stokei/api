import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { CreateSubscriptionInput } from '@/controllers/graphql/inputs/subscriptions/create-subscription.input';
import { Subscription } from '@/controllers/graphql/types/subscription';
import { CreateSubscriptionService } from '@/services/subscriptions/create-subscription';

@Resolver(() => Subscription)
export class CreateSubscriptionResolver {
  constructor(
    private readonly createSubscriptionService: CreateSubscriptionService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Subscription)
  async createSubscription(@Args('input') data: CreateSubscriptionInput) {
    const response = await this.createSubscriptionService.execute(data);
    return response;
  }
}
