import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Account } from '@/controllers/graphql/types/account';
import { OrderItem } from '@/controllers/graphql/types/order-item';
import { OrderItemModel } from '@/models/order-item.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';

@Resolver(() => OrderItem)
export class OrderItemUpdatedByResolver {
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  @ResolveField(() => Account)
  updatedBy(@Parent() orderItem: OrderItemModel) {
    return this.findAccountByIdService.execute(orderItem.updatedBy);
  }
}
