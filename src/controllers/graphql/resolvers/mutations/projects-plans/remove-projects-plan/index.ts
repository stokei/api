import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { RemoveProjectsPlanInput } from '@/controllers/graphql/inputs/projects-plans/remove-projects-plan.input';
import { ProjectsPlan } from '@/controllers/graphql/types/projects-plan';
import { RemoveProjectsPlanService } from '@/services/projects-plans/remove-projects-plan';

@Resolver(() => ProjectsPlan)
export class RemoveProjectsPlanResolver {
  constructor(
    private readonly removeProjectsPlanService: RemoveProjectsPlanService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => ProjectsPlan)
  async removeProjectsPlan(
    @Args('input') data: RemoveProjectsPlanInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeProjectsPlanService.execute(data);
    return response;
  }
}
