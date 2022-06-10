import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { RemoveProjectInput } from '@/controllers/graphql/inputs/projects/remove-project.input';
import { Project } from '@/controllers/graphql/types/project';
import { RemoveProjectService } from '@/services/projects/remove-project';

@Resolver(() => Project)
export class RemoveProjectResolver {
  constructor(private readonly removeProjectService: RemoveProjectService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Project)
  async removeProject(@Args('input') data: RemoveProjectInput) {
    const response = await this.removeProjectService.execute(data);
    return response;
  }
}
