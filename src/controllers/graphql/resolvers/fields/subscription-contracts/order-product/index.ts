import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ProductsLoader } from '@/controllers/graphql/dataloaders/products.loader';
import { Product } from '@/controllers/graphql/types/product';
import { SubscriptionContract } from '@/controllers/graphql/types/subscription-contract';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';

@Resolver(() => SubscriptionContract)
export class SubscriptionContractOrderProductResolver {
  constructor(private readonly productsLoader: ProductsLoader) {}

  @ResolveField(() => Product, { nullable: true })
  orderProduct(@Parent() subscriptionContract: SubscriptionContractModel) {
    return (
      subscriptionContract.orderProduct &&
      this.productsLoader.findByIds.load(subscriptionContract.orderProduct)
    );
  }
}
