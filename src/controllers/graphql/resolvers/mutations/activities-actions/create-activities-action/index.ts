import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { CreateActivitiesActionInput } from '@/controllers/graphql/inputs/activities-actions/create-activities-action.input';
import { ActivitiesAction } from '@/controllers/graphql/types/activities-action';
import { CreateActivitiesActionService } from '@/services/activities-actions/create-activities-action';

@Resolver(() => ActivitiesAction)
export class CreateActivitiesActionResolver {
  constructor(
    private readonly createActivitiesActionService: CreateActivitiesActionService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => ActivitiesAction)
  async createActivitiesAction(
    @Args('input') data: CreateActivitiesActionInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createActivitiesActionService.execute(data);
    return response;
  }
}
