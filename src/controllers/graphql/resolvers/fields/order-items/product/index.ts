import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ProductsLoader } from '@/controllers/graphql/dataloaders/products.loader';
import { OrderItem } from '@/controllers/graphql/types/order-item';
import { Product } from '@/controllers/graphql/types/product';
import { OrderItemModel } from '@/models/order-item.model';

@Resolver(() => OrderItem)
export class OrderItemProductResolver {
  constructor(private readonly productsLoader: ProductsLoader) {}

  @ResolveField(() => Product, { nullable: true })
  product(@Parent() orderItem: OrderItemModel) {
    return (
      orderItem.product && this.productsLoader.findByIds.load(orderItem.product)
    );
  }
}
