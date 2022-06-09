import { Args, Query, Resolver } from '@nestjs/graphql';

import { CheckoutsCurrenciesLoader } from '@/controllers/graphql/dataloaders/checkouts-currencies.loader';
import { CheckoutsCurrency } from '@/controllers/graphql/types/checkouts-currency';
import {
  CheckoutsCurrencyNotFoundException,
  ParamNotFoundException
} from '@/errors';

@Resolver(() => CheckoutsCurrency)
export class CheckoutsCurrencyResolver {
  constructor(
    private readonly checkoutsCurrenciesLoader: CheckoutsCurrenciesLoader
  ) {}

  @Query(() => CheckoutsCurrency)
  async checkoutsCurrency(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const checkoutsCurrency =
      await this.checkoutsCurrenciesLoader.findByIds.load(id);
    if (!checkoutsCurrency) {
      throw new CheckoutsCurrencyNotFoundException();
    }
    return checkoutsCurrency;
  }
}
