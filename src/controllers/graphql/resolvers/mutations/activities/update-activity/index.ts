import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { UpdateActivityInput } from '@/controllers/graphql/inputs/activities/update-activity.input';
import { Activity } from '@/controllers/graphql/types/activity';
import { UpdateActivityService } from '@/services/activities/update-activity';

@Resolver(() => Activity)
export class UpdateActivityResolver {
  constructor(private readonly updateActivityService: UpdateActivityService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Activity)
  async updateActivity(
    @Args('input') data: UpdateActivityInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updateActivityService.execute(data);
    return response;
  }
}
