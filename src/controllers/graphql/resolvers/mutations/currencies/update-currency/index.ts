import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { AppGuard } from '@/common/guards/app';
import { UpdateCurrencyInput } from '@/controllers/graphql/inputs/currencies/update-currency.input';
import { Currency } from '@/controllers/graphql/types/currency';
import { UpdateCurrencyService } from '@/services/currencies/update-currency';

@Resolver(() => Currency)
export class UpdateCurrencyResolver {
  constructor(private readonly updateCurrencyService: UpdateCurrencyService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Currency)
  async updateCurrency(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: UpdateCurrencyInput
  ) {
    const response = await this.updateCurrencyService.execute({
      where: {
        ...data?.where
      },
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
