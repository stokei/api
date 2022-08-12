import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Order } from '@/controllers/graphql/types/order';
import { OrderModel } from '@/models/order.model';

@Resolver(() => Order)
export class OrderCustomerResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  customer(@Parent() order: OrderModel) {
    return order.customer && this.accountsLoader.findByIds.load(order.customer);
  }
}
