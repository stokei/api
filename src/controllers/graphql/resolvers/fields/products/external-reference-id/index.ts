import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Product } from '@/controllers/graphql/types/product';
import { ProductModel } from '@/models/product.model';

@Resolver(() => Product)
export class ProductExternalReferenceIdResolver {
  @ResolveField(() => String, { nullable: true })
  async externalReferenceId(@Parent() product: ProductModel) {
    return product.externalReference;
  }
}
