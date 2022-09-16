import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { CurrenciesLoader } from '@/controllers/graphql/dataloaders/currencies.loader';
import { Currency } from '@/controllers/graphql/types/currency';
import { Invoice } from '@/controllers/graphql/types/invoice';
import { InvoiceModel } from '@/models/invoice.model';

@Resolver(() => Invoice)
export class InvoiceCurrencyResolver {
  constructor(private readonly currenciesLoader: CurrenciesLoader) {}

  @ResolveField(() => Currency, { nullable: true })
  currency(@Parent() invoice: InvoiceModel) {
    return (
      invoice.currency && this.currenciesLoader.findByIds.load(invoice.currency)
    );
  }
}
