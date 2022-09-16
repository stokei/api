import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { ConfirmCheckoutInput } from '@/controllers/graphql/inputs/checkouts/confirm-checkout.input';
import { Checkout } from '@/controllers/graphql/types/checkout';
import { ConfirmCheckoutService } from '@/services/checkouts/confirm-checkout';

@Resolver(() => Checkout)
export class ConfirmCheckoutResolver {
  constructor(
    private readonly confirmCheckoutService: ConfirmCheckoutService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Checkout)
  async confirmCheckout(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') currentAppId: string,
    @Args('input') data: ConfirmCheckoutInput
  ) {
    const response = await this.confirmCheckoutService.execute({
      ...data,
      app: currentAppId,
      createdBy: currentAccountId
    });
    return response;
  }
}
