import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreatePlanInput } from '@/controllers/graphql/inputs/plans/create-plan.input';
import { Plan } from '@/controllers/graphql/types/plan';
import { CreatePlanService } from '@/services/plans/create-plan';

@Resolver(() => Plan)
export class CreatePlanResolver {
  constructor(private readonly createPlanService: CreatePlanService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Plan)
  async createPlan(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') currentAppId: string,
    @Args('input') data: CreatePlanInput
  ) {
    const response = await this.createPlanService.execute({
      ...data,
      app: currentAppId,
      createdBy: currentAccountId
    });
    return response;
  }
}
