import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { App } from '@/controllers/graphql/types/app';
import { Order } from '@/controllers/graphql/types/order';
import { OrderModel } from '@/models/order.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

@Resolver(() => Order)
export class OrderAppResolver {
  constructor(private readonly findAppByIdService: FindAppByIdService) {}

  @ResolveField(() => App)
  app(@Parent() order: OrderModel) {
    return this.findAppByIdService.execute(order.app);
  }
}
