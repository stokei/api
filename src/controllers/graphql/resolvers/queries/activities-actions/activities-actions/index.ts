import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllActivitiesActionsInput,
  WhereDataFindAllActivitiesActionsInput
} from '@/controllers/graphql/inputs/activities-actions/find-all-activities-actions.input';
import { ActivitiesAction } from '@/controllers/graphql/types/activities-action';
import { ActivitiesActions } from '@/controllers/graphql/types/activities-actions';
import { FindAllActivitiesActionsService } from '@/services/activities-actions/find-all-activities-actions';

@Resolver(() => ActivitiesAction)
export class ActivitiesActionsResolver {
  constructor(
    private readonly findAllActivitiesActionsService: FindAllActivitiesActionsService
  ) {}

  @Query(() => ActivitiesActions)
  async activitiesActions(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllActivitiesActionsInput,
      nullable: true
    })
    where: WhereDataFindAllActivitiesActionsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllActivitiesActionsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllActivitiesActionsInput
  ) {
    return await this.findAllActivitiesActionsService.execute({
      page,
      where,
      orderBy
    });
  }
}
