import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CreateProjectInput } from '@/controllers/graphql/inputs/projects/create-project.input';
import { Project } from '@/controllers/graphql/types/project';
import { CreateProjectService } from '@/services/projects/create-project';

@Resolver(() => Project)
export class CreateProjectResolver {
  constructor(private readonly createProjectService: CreateProjectService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Project)
  async createProject(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: CreateProjectInput
  ) {
    const response = await this.createProjectService.execute({
      ...data,
      createdBy: currentAccountId
    });
    return response;
  }
}
