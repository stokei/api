import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { CreateCheckoutsCurrencyInput } from '@/controllers/graphql/inputs/checkouts-currencies/create-checkouts-currency.input';
import { CheckoutsCurrency } from '@/controllers/graphql/types/checkouts-currency';
import { CreateCheckoutsCurrencyService } from '@/services/checkouts-currencies/create-checkouts-currency';

@Resolver(() => CheckoutsCurrency)
export class CreateCheckoutsCurrencyResolver {
  constructor(
    private readonly createCheckoutsCurrencyService: CreateCheckoutsCurrencyService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => CheckoutsCurrency)
  async createCheckoutsCurrency(
    @Args('input') data: CreateCheckoutsCurrencyInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createCheckoutsCurrencyService.execute(data);
    return response;
  }
}
