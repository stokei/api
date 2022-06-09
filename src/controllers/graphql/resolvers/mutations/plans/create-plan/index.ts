import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { CreatePlanInput } from '@/controllers/graphql/inputs/plans/create-plan.input';
import { Plan } from '@/controllers/graphql/types/plan';
import { CreatePlanService } from '@/services/plans/create-plan';

@Resolver(() => Plan)
export class CreatePlanResolver {
  constructor(private readonly createPlanService: CreatePlanService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Plan)
  async createPlan(
    @Args('input') data: CreatePlanInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createPlanService.execute(data);
    return response;
  }
}
