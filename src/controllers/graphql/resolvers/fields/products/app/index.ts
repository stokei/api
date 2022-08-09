import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Product } from '@/controllers/graphql/types/product';
import { ProductModel } from '@/models/product.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

@Resolver(() => Product)
export class ProductAppResolver {
  constructor(private readonly findAppByIdService: FindAppByIdService) {}

  @ResolveField(() => Product)
  app(@Parent() product: ProductModel) {
    return this.findAppByIdService.execute(product.app);
  }
}
