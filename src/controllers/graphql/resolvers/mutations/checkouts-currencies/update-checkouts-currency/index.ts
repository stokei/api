import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { UpdateCheckoutsCurrencyInput } from '@/controllers/graphql/inputs/checkouts-currencies/update-checkouts-currency.input';
import { CheckoutsCurrency } from '@/controllers/graphql/types/checkouts-currency';
import { UpdateCheckoutsCurrencyService } from '@/services/checkouts-currencies/update-checkouts-currency';

@Resolver(() => CheckoutsCurrency)
export class UpdateCheckoutsCurrencyResolver {
  constructor(
    private readonly updateCheckoutsCurrencyService: UpdateCheckoutsCurrencyService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => CheckoutsCurrency)
  async updateCheckoutsCurrency(
    @Args('input') data: UpdateCheckoutsCurrencyInput
  ) {
    const response = await this.updateCheckoutsCurrencyService.execute(data);
    return response;
  }
}
