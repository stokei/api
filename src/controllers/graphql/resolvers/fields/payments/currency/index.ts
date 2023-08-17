import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { CurrenciesLoader } from '@/controllers/graphql/dataloaders/currencies.loader';
import { Currency } from '@/controllers/graphql/types/currency';
import { Payment } from '@/controllers/graphql/types/payment';
import { PaymentModel } from '@/models/payment.model';

@Resolver(() => Payment)
export class PaymentCurrencyResolver {
  constructor(private readonly currenciesLoader: CurrenciesLoader) {}

  @ResolveField(() => Currency, { nullable: true })
  currency(@Parent() payment: PaymentModel) {
    return (
      payment.currency && this.currenciesLoader.findByIds.load(payment.currency)
    );
  }
}
