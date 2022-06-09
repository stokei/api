import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { RemoveCheckoutsCurrencyInput } from '@/controllers/graphql/inputs/checkouts-currencies/remove-checkouts-currency.input';
import { CheckoutsCurrency } from '@/controllers/graphql/types/checkouts-currency';
import { RemoveCheckoutsCurrencyService } from '@/services/checkouts-currencies/remove-checkouts-currency';

@Resolver(() => CheckoutsCurrency)
export class RemoveCheckoutsCurrencyResolver {
  constructor(
    private readonly removeCheckoutsCurrencyService: RemoveCheckoutsCurrencyService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => CheckoutsCurrency)
  async removeCheckoutsCurrency(
    @Args('input') data: RemoveCheckoutsCurrencyInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeCheckoutsCurrencyService.execute(data);
    return response;
  }
}
