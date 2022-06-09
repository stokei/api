import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { UpdatePlanInput } from '@/controllers/graphql/inputs/plans/update-plan.input';
import { Plan } from '@/controllers/graphql/types/plan';
import { UpdatePlanService } from '@/services/plans/update-plan';

@Resolver(() => Plan)
export class UpdatePlanResolver {
  constructor(private readonly updatePlanService: UpdatePlanService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Plan)
  async updatePlan(
    @Args('input') data: UpdatePlanInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updatePlanService.execute(data);
    return response;
  }
}
