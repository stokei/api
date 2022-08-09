import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Account } from '@/controllers/graphql/types/account';
import { Order } from '@/controllers/graphql/types/order';
import { OrderModel } from '@/models/order.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';

@Resolver(() => Order)
export class OrderUpdatedByResolver {
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  @ResolveField(() => Account)
  updatedBy(@Parent() order: OrderModel) {
    return this.findAccountByIdService.execute(order.updatedBy);
  }
}
