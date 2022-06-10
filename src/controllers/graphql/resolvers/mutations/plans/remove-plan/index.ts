import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { RemovePlanInput } from '@/controllers/graphql/inputs/plans/remove-plan.input';
import { Plan } from '@/controllers/graphql/types/plan';
import { RemovePlanService } from '@/services/plans/remove-plan';

@Resolver(() => Plan)
export class RemovePlanResolver {
  constructor(private readonly removePlanService: RemovePlanService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Plan)
  async removePlan(@Args('input') data: RemovePlanInput) {
    const response = await this.removePlanService.execute(data);
    return response;
  }
}
