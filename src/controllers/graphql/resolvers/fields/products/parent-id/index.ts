import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Product } from '@/controllers/graphql/types/product';
import { ProductModel } from '@/models/product.model';

@Resolver(() => Product)
export class ProductParentIdResolver {
  @ResolveField(() => String, { nullable: true })
  async parentId(@Parent() product: ProductModel) {
    return product.parent;
  }
}
