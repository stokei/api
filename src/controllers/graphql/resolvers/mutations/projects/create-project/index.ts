import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { CreateProjectInput } from '@/controllers/graphql/inputs/projects/create-project.input';
import { Project } from '@/controllers/graphql/types/project';
import { CreateProjectService } from '@/services/projects/create-project';

@Resolver(() => Project)
export class CreateProjectResolver {
  constructor(private readonly createProjectService: CreateProjectService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Project)
  async createProject(
    @Args('input') data: CreateProjectInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createProjectService.execute(data);
    return response;
  }
}
