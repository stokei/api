import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { UpdateActivitiesActionInput } from '@/controllers/graphql/inputs/activities-actions/update-activities-action.input';
import { ActivitiesAction } from '@/controllers/graphql/types/activities-action';
import { UpdateActivitiesActionService } from '@/services/activities-actions/update-activities-action';

@Resolver(() => ActivitiesAction)
export class UpdateActivitiesActionResolver {
  constructor(
    private readonly updateActivitiesActionService: UpdateActivitiesActionService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => ActivitiesAction)
  async updateActivitiesAction(
    @Args('input') data: UpdateActivitiesActionInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updateActivitiesActionService.execute(data);
    return response;
  }
}
