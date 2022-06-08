import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { CreateActivityInput } from '@/controllers/graphql/inputs/activities/create-activity.input';
import { Activity } from '@/controllers/graphql/types/activity';
import { CreateActivityService } from '@/services/activities/create-activity';

@Resolver(() => Activity)
export class CreateActivityResolver {
  constructor(private readonly createActivityService: CreateActivityService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Activity)
  async createActivity(
    @Args('input') data: CreateActivityInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createActivityService.execute(data);
    return response;
  }
}
