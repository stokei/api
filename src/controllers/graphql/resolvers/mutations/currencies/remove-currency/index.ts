import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { RemoveCurrencyInput } from '@/controllers/graphql/inputs/currencies/remove-currency.input';
import { Currency } from '@/controllers/graphql/types/currency';
import { RemoveCurrencyService } from '@/services/currencies/remove-currency';

@Resolver(() => Currency)
export class RemoveCurrencyResolver {
  constructor(private readonly removeCurrencyService: RemoveCurrencyService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Currency)
  async removeCurrency(
    @Args('input') data: RemoveCurrencyInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeCurrencyService.execute(data);
    return response;
  }
}
