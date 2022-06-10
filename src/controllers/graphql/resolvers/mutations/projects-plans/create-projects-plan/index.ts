import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { CreateProjectsPlanInput } from '@/controllers/graphql/inputs/projects-plans/create-projects-plan.input';
import { ProjectsPlan } from '@/controllers/graphql/types/projects-plan';
import { CreateProjectsPlanService } from '@/services/projects-plans/create-projects-plan';

@Resolver(() => ProjectsPlan)
export class CreateProjectsPlanResolver {
  constructor(
    private readonly createProjectsPlanService: CreateProjectsPlanService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => ProjectsPlan)
  async createProjectsPlan(@Args('input') data: CreateProjectsPlanInput) {
    const response = await this.createProjectsPlanService.execute(data);
    return response;
  }
}
