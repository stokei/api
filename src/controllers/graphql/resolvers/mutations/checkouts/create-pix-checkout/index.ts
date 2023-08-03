import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreatePixCheckoutInput } from '@/controllers/graphql/inputs/checkouts/create-pix-checkout.input';
import { PixCheckout } from '@/controllers/graphql/types/pix-checkout';
import { CreatePixCheckoutService } from '@/services/checkouts/create-pix-checkout';

@Resolver(() => PixCheckout)
export class CreatePixCheckoutResolver {
  constructor(
    private readonly createPixCheckoutService: CreatePixCheckoutService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => PixCheckout)
  async createPixCheckout(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') currentAppId: string,
    @Args('input') data: CreatePixCheckoutInput
  ) {
    const response = await this.createPixCheckoutService.execute({
      ...data,
      customer: currentAccountId,
      app: currentAppId,
      createdBy: currentAccountId
    });
    return response;
  }
}
