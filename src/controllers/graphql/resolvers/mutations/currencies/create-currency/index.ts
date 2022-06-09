import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { CreateCurrencyInput } from '@/controllers/graphql/inputs/currencies/create-currency.input';
import { Currency } from '@/controllers/graphql/types/currency';
import { CreateCurrencyService } from '@/services/currencies/create-currency';

@Resolver(() => Currency)
export class CreateCurrencyResolver {
  constructor(private readonly createCurrencyService: CreateCurrencyService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Currency)
  async createCurrency(
    @Args('input') data: CreateCurrencyInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createCurrencyService.execute(data);
    return response;
  }
}
