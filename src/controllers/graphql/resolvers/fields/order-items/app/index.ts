import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { OrderItem } from '@/controllers/graphql/types/order-item';
import { OrderItemModel } from '@/models/order-item.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

@Resolver(() => OrderItem)
export class OrderItemAppResolver {
  constructor(private readonly findAppByIdService: FindAppByIdService) {}

  @ResolveField(() => OrderItem)
  app(@Parent() orderItem: OrderItemModel) {
    return this.findAppByIdService.execute(orderItem.app);
  }
}
