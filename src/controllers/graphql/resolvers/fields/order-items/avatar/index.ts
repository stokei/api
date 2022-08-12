import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ImagesLoader } from '@/controllers/graphql/dataloaders/images.loader';
import { Image } from '@/controllers/graphql/types/image';
import { OrderItem } from '@/controllers/graphql/types/order-item';
import { OrderItemModel } from '@/models/order-item.model';

@Resolver(() => OrderItem)
export class OrderItemAvatarResolver {
  constructor(private readonly imagesLoader: ImagesLoader) {}

  @ResolveField(() => Image, { nullable: true })
  avatar(@Parent() orderItem: OrderItemModel) {
    return (
      orderItem.avatar && this.imagesLoader.findByIds.load(orderItem.avatar)
    );
  }
}
