import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { OrderItem } from '@/controllers/graphql/types/order-item';
import { OrderItemModel } from '@/models/order-item.model';

@Resolver(() => OrderItem)
export class OrderItemCreatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  createdBy(@Parent() orderItem: OrderItemModel) {
    return (
      orderItem.createdBy &&
      this.accountsLoader.findByIds.load(orderItem.createdBy)
    );
  }
}
