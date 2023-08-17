import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { RecurringsLoader } from '@/controllers/graphql/dataloaders/recurrings.loader';
import { OrderItem } from '@/controllers/graphql/types/order-item';
import { Recurring } from '@/controllers/graphql/types/recurring';
import { OrderItemModel } from '@/models/order-item.model';

@Resolver(() => OrderItem)
export class OrderItemRecurringResolver {
  constructor(private readonly recurringsLoader: RecurringsLoader) {}

  @ResolveField(() => Recurring, { nullable: true })
  recurring(@Parent() orderItem: OrderItemModel) {
    return (
      orderItem.recurring &&
      this.recurringsLoader.findByIds.load(orderItem.recurring)
    );
  }
}
