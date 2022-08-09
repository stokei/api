import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { OrderItem } from '@/controllers/graphql/types/order-item';
import { OrderItemModel } from '@/models/order-item.model';

@Resolver(() => OrderItem)
export class OrderItemUpdatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  updatedBy(@Parent() orderItem: OrderItemModel) {
    return (
      orderItem.updatedBy &&
      this.accountsLoader.findByIds.load(orderItem.updatedBy)
    );
  }
}
