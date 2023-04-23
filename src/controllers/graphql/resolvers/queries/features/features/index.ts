import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllFeaturesInput,
  WhereDataFindAllFeaturesInput
} from '@/controllers/graphql/inputs/features/find-all-features.input';
import { Feature } from '@/controllers/graphql/types/feature';
import { Features } from '@/controllers/graphql/types/features';
import { FindAllFeaturesService } from '@/services/features/find-all-features';

@Resolver(() => Feature)
export class FeaturesResolver {
  constructor(
    private readonly findAllFeaturesService: FindAllFeaturesService
  ) {}

  @Query(() => Features)
  async features(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllFeaturesInput,
      nullable: true
    })
    where: WhereDataFindAllFeaturesInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllFeaturesInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllFeaturesInput
  ) {
    return await this.findAllFeaturesService.execute({
      page,
      where,
      orderBy
    });
  }
}
