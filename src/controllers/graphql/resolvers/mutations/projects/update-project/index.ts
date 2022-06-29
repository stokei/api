import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { UpdateProjectInput } from '@/controllers/graphql/inputs/projects/update-project.input';
import { Project } from '@/controllers/graphql/types/project';
import { UpdateProjectService } from '@/services/projects/update-project';

@Resolver(() => Project)
export class UpdateProjectResolver {
  constructor(private readonly updateProjectService: UpdateProjectService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Project)
  async updateProject(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: UpdateProjectInput
  ) {
    const response = await this.updateProjectService.execute({
      ...data,
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
