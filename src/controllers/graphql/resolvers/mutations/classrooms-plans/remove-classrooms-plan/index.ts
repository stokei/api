import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { RemoveClassroomsPlanInput } from '@/controllers/graphql/inputs/classrooms-plans/remove-classrooms-plan.input';
import { ClassroomsPlan } from '@/controllers/graphql/types/classrooms-plan';
import { RemoveClassroomsPlanService } from '@/services/classrooms-plans/remove-classrooms-plan';

@Resolver(() => ClassroomsPlan)
export class RemoveClassroomsPlanResolver {
  constructor(
    private readonly removeClassroomsPlanService: RemoveClassroomsPlanService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => ClassroomsPlan)
  async removeClassroomsPlan(
    @Args('input') data: RemoveClassroomsPlanInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeClassroomsPlanService.execute(data);
    return response;
  }
}
