import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { RemoveProjectInput } from '@/controllers/graphql/inputs/projects/remove-project.input';
import { Project } from '@/controllers/graphql/types/project';
import { RemoveProjectService } from '@/services/projects/remove-project';

@Resolver(() => Project)
export class RemoveProjectResolver {
  constructor(private readonly removeProjectService: RemoveProjectService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Project)
  async removeProject(
    @Args('input') data: RemoveProjectInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeProjectService.execute(data);
    return response;
  }
}
