import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { RemoveCurrencyInput } from '@/controllers/graphql/inputs/currencies/remove-currency.input';
import { Currency } from '@/controllers/graphql/types/currency';
import { RemoveCurrencyService } from '@/services/currencies/remove-currency';

@Resolver(() => Currency)
export class RemoveCurrencyResolver {
  constructor(private readonly removeCurrencyService: RemoveCurrencyService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Currency)
  async removeCurrency(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: RemoveCurrencyInput
  ) {
    const response = await this.removeCurrencyService.execute({
      ...data,
      where: {
        ...data?.where,
        app: appId,
        removedBy: currentAccountId
      }
    });
    return response;
  }
}
