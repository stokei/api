import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import { OrderByDataFindAllFeaturesInput } from '@/controllers/graphql/inputs/features/find-all-features.input';
import { Features } from '@/controllers/graphql/types/features';
import { Plan } from '@/controllers/graphql/types/plan';
import { PlanModel } from '@/models/plan.model';
import { FindAllFeaturesService } from '@/services/features/find-all-features';

@Resolver(() => Plan)
export class PlanFeaturesResolver {
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
    @Parent() plan: PlanModel
  ) {
    return this.findAllFeaturesService.execute({
      page,
      orderBy,
      where: {
        AND: {
          parent: {
            equals: plan.id
          }
        }
      }
    });
  }
}
