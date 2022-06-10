import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { CreateProjectInput } from '@/controllers/graphql/inputs/projects/create-project.input';
import { Project } from '@/controllers/graphql/types/project';
import { CreateProjectService } from '@/services/projects/create-project';

@Resolver(() => Project)
export class CreateProjectResolver {
  constructor(private readonly createProjectService: CreateProjectService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Project)
  async createProject(@Args('input') data: CreateProjectInput) {
    const response = await this.createProjectService.execute(data);
    return response;
  }
}
