import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreateCheckoutInput } from '@/controllers/graphql/inputs/checkouts/create-checkout.input';
import { Checkout } from '@/controllers/graphql/types/checkout';
import { CreateCheckoutService } from '@/services/checkouts/create-checkout';

@Resolver(() => Checkout)
export class CreateCheckoutResolver {
  constructor(private readonly createCheckoutService: CreateCheckoutService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Checkout)
  async createCheckout(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') currentAppId: string,
    @Args('input') data: CreateCheckoutInput
  ) {
    const response = await this.createCheckoutService.execute({
      ...data,
      customer: data.app || currentAccountId,
      app: currentAppId,
      createdBy: currentAccountId
    });
    return response;
  }
}
