import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Order } from '@/controllers/graphql/types/order';
import { OrderModel } from '@/models/order.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

@Resolver(() => Order)
export class OrderAppResolver {
  constructor(private readonly findAppByIdService: FindAppByIdService) {}

  @ResolveField(() => Order)
  app(@Parent() order: OrderModel) {
    return this.findAppByIdService.execute(order.app);
  }
}
