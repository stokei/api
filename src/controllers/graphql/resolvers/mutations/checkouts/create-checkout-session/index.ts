import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreateCheckoutSessionInput } from '@/controllers/graphql/inputs/checkouts/create-checkout-session.input';
import { Checkout } from '@/controllers/graphql/types/checkout';
import { CreateCheckoutSessionService } from '@/services/checkouts/create-checkout-session';

@Resolver(() => Checkout)
export class CreateCheckoutSessionResolver {
  constructor(
    private readonly createCheckoutSessionService: CreateCheckoutSessionService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Checkout)
  async createCheckoutSession(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') currentAppCurrentAppId: string,
    @Args('input') data: CreateCheckoutSessionInput
  ) {
    const response = await this.createCheckoutSessionService.execute({
      ...data,
      customer: data.app || currentAccountId,
      app: currentAppCurrentAppId,
      createdBy: currentAccountId
    });
    return response;
  }
}
