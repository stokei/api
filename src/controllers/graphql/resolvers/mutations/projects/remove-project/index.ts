import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { RemoveProjectInput } from '@/controllers/graphql/inputs/projects/remove-project.input';
import { Project } from '@/controllers/graphql/types/project';
import { RemoveProjectService } from '@/services/projects/remove-project';

@Resolver(() => Project)
export class RemoveProjectResolver {
  constructor(private readonly removeProjectService: RemoveProjectService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Project)
  async removeProject(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: RemoveProjectInput
  ) {
    const response = await this.removeProjectService.execute({
      ...data,
      where: {
        ...data?.where,
        removedBy: currentAccountId
      }
    });
    return response;
  }
}
