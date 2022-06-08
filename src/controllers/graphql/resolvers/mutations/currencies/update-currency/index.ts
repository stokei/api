import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { UpdateCurrencyInput } from '@/controllers/graphql/inputs/currencies/update-currency.input';
import { Currency } from '@/controllers/graphql/types/currency';
import { UpdateCurrencyService } from '@/services/currencies/update-currency';

@Resolver(() => Currency)
export class UpdateCurrencyResolver {
  constructor(private readonly updateCurrencyService: UpdateCurrencyService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Currency)
  async updateCurrency(
    @Args('input') data: UpdateCurrencyInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updateCurrencyService.execute(data);
    return response;
  }
}
