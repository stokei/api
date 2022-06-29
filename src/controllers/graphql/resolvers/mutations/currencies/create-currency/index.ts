import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CreateCurrencyInput } from '@/controllers/graphql/inputs/currencies/create-currency.input';
import { Currency } from '@/controllers/graphql/types/currency';
import { CreateCurrencyService } from '@/services/currencies/create-currency';

@Resolver(() => Currency)
export class CreateCurrencyResolver {
  constructor(private readonly createCurrencyService: CreateCurrencyService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Currency)
  async createCurrency(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: CreateCurrencyInput
  ) {
    const response = await this.createCurrencyService.execute({
      ...data,
      createdBy: currentAccountId
    });
    return response;
  }
}
