import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { CurrenciesLoader } from '@/controllers/graphql/dataloaders/currencies.loader';
import { Currency } from '@/controllers/graphql/types/currency';
import { Order } from '@/controllers/graphql/types/order';
import { OrderModel } from '@/models/order.model';

@Resolver(() => Order)
export class OrderCurrencyResolver {
  constructor(private readonly currenciesLoader: CurrenciesLoader) {}

  @ResolveField(() => Currency, { nullable: true })
  currency(@Parent() order: OrderModel) {
    return (
      order.currency && this.currenciesLoader.findByIds.load(order.currency)
    );
  }
}
