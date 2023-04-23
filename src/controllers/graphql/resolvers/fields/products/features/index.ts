import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import { OrderByDataFindAllFeaturesInput } from '@/controllers/graphql/inputs/features/find-all-features.input';
import { Features } from '@/controllers/graphql/types/features';
import { Product } from '@/controllers/graphql/types/product';
import { ProductModel } from '@/models/product.model';
import { FindAllFeaturesService } from '@/services/features/find-all-features';

@Resolver(() => Product)
export class ProductFeaturesResolver {
  constructor(
    private readonly findAllFeaturesService: FindAllFeaturesService
  ) {}

  @ResolveField(() => Features, { nullable: true })
  features(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllFeaturesInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllFeaturesInput,
    @Parent() product: ProductModel
  ) {
    return this.findAllFeaturesService.execute({
      page,
      orderBy,
      where: {
        AND: {
          parent: {
            equals: product.id
          }
        }
      }
    });
  }
}
