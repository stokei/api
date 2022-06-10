import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { UpdateClassroomsPlanInput } from '@/controllers/graphql/inputs/classrooms-plans/update-classrooms-plan.input';
import { ClassroomsPlan } from '@/controllers/graphql/types/classrooms-plan';
import { UpdateClassroomsPlanService } from '@/services/classrooms-plans/update-classrooms-plan';

@Resolver(() => ClassroomsPlan)
export class UpdateClassroomsPlanResolver {
  constructor(
    private readonly updateClassroomsPlanService: UpdateClassroomsPlanService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => ClassroomsPlan)
  async updateClassroomsPlan(@Args('input') data: UpdateClassroomsPlanInput) {
    const response = await this.updateClassroomsPlanService.execute(data);
    return response;
  }
}
