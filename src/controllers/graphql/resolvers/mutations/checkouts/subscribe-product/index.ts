import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { SubscribeProductInput } from '@/controllers/graphql/inputs/checkouts/subscribe-product.input';
import { Checkout } from '@/controllers/graphql/types/checkout';
import { CreateCheckoutService } from '@/services/checkouts/create-checkout';

@Resolver(() => Checkout)
export class SubscribeProductResolver {
  constructor(private readonly createCheckoutService: CreateCheckoutService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Checkout)
  async subscribeProduct(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') currentAppId: string,
    @Args('input') data: SubscribeProductInput
  ) {
    const response = await this.createCheckoutService.execute({
      ...data,
      customer: currentAccountId,
      app: currentAppId,
      createdBy: currentAccountId
    });
    return response;
  }
}
