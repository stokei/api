import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { Order } from '@/controllers/graphql/types/order';
import { OrderModel } from '@/models/order.model';

@Resolver(() => Order)
export class OrderAppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @ResolveField(() => App, { nullable: true })
  app(@Parent() order: OrderModel) {
    return order.app && this.appsLoader.findByIds.load(order.app);
  }
}
