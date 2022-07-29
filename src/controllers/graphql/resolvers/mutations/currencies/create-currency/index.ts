import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreateCurrencyInput } from '@/controllers/graphql/inputs/currencies/create-currency.input';
import { Currency } from '@/controllers/graphql/types/currency';
import { CreateCurrencyService } from '@/services/currencies/create-currency';

@Resolver(() => Currency)
export class CreateCurrencyResolver {
  constructor(private readonly createCurrencyService: CreateCurrencyService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Currency)
  async createCurrency(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: CreateCurrencyInput
  ) {
    const response = await this.createCurrencyService.execute({
      ...data,
      app: appId,
      createdBy: currentAccountId
    });
    return response;
  }
}
