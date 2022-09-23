import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CancelSubscriptionContractInput } from '@/controllers/graphql/inputs/subscription-contracts/cancel-subscription-contract.input';
import { SubscriptionContract } from '@/controllers/graphql/types/subscription-contract';
import { CancelStripeSubscriptionService } from '@/services/stripe/cancel-stripe-subscription';
import { FindSubscriptionContractByIdService } from '@/services/subscription-contracts/find-subscription-contract-by-id';

@Resolver(() => SubscriptionContract)
export class CancelSubscriptionContractResolver {
  constructor(
    private readonly findSubscriptionContractByIdService: FindSubscriptionContractByIdService,
    private readonly cancelStripeSubscriptionService: CancelStripeSubscriptionService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => SubscriptionContract)
  async cancelSubscriptionContract(
    @CurrentApp('stripeAccount') appStripeAccount: string,
    @Args('input') data: CancelSubscriptionContractInput
  ) {
    const subscription = await this.findSubscriptionContractByIdService.execute(
      data.subscriptionContract
    );
    await this.cancelStripeSubscriptionService.execute({
      subscription: subscription?.stripeSubscription,
      stripeAccount: appStripeAccount
    });
    return subscription;
  }
}
