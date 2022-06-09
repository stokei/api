import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllActivitiesInput,
  WhereDataFindAllActivitiesInput
} from '@/controllers/graphql/inputs/activities/find-all-activities.input';
import { Activities } from '@/controllers/graphql/types/activities';
import { Activity } from '@/controllers/graphql/types/activity';
import { FindAllActivitiesService } from '@/services/activities/find-all-activities';

@Resolver(() => Activity)
export class ActivitiesResolver {
  constructor(
    private readonly findAllActivitiesService: FindAllActivitiesService
  ) {}

  @Query(() => Activities)
  async activities(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllActivitiesInput,
      nullable: true
    })
    where: WhereDataFindAllActivitiesInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllActivitiesInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllActivitiesInput
  ) {
    return await this.findAllActivitiesService.execute({
      page,
      where,
      orderBy
    });
  }
}
