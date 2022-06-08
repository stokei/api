import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { UpdateProjectsPlanInput } from '@/controllers/graphql/inputs/projects-plans/update-projects-plan.input';
import { ProjectsPlan } from '@/controllers/graphql/types/projects-plan';
import { UpdateProjectsPlanService } from '@/services/projects-plans/update-projects-plan';

@Resolver(() => ProjectsPlan)
export class UpdateProjectsPlanResolver {
  constructor(
    private readonly updateProjectsPlanService: UpdateProjectsPlanService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => ProjectsPlan)
  async updateProjectsPlan(
    @Args('input') data: UpdateProjectsPlanInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updateProjectsPlanService.execute(data);
    return response;
  }
}
