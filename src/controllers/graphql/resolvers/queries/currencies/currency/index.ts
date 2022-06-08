import { Args, Query, Resolver } from '@nestjs/graphql';
import { CurrenciesLoader } from '@/controllers/graphql/dataloaders/currencies.loader';
import { Currency } from '@/controllers/graphql/types/currency';
import { CurrencyNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => Currency)
export class CurrencyResolver {
  constructor(private readonly currenciesLoader: CurrenciesLoader) {}

  @Query(() => Currency)
  async currency(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const currency = await this.currenciesLoader.findByIds.load(id);
    if (!currency) {
      throw new CurrencyNotFoundException();
    }
    return currency;
  }
}
