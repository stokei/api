import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Account } from '@/controllers/graphql/types/account';
import { Order } from '@/controllers/graphql/types/order';
import { OrderModel } from '@/models/order.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';

@Resolver(() => Order)
export class OrderCreatedByResolver {
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  @ResolveField(() => Account)
  createdBy(@Parent() order: OrderModel) {
    return this.findAccountByIdService.execute(order.createdBy);
  }
}
