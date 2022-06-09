import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { RemoveActivitiesActionInput } from '@/controllers/graphql/inputs/activities-actions/remove-activities-action.input';
import { ActivitiesAction } from '@/controllers/graphql/types/activities-action';
import { RemoveActivitiesActionService } from '@/services/activities-actions/remove-activities-action';

@Resolver(() => ActivitiesAction)
export class RemoveActivitiesActionResolver {
  constructor(
    private readonly removeActivitiesActionService: RemoveActivitiesActionService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => ActivitiesAction)
  async removeActivitiesAction(
    @Args('input') data: RemoveActivitiesActionInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeActivitiesActionService.execute(data);
    return response;
  }
}
