import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { CreateClassroomsPlanInput } from '@/controllers/graphql/inputs/classrooms-plans/create-classrooms-plan.input';
import { ClassroomsPlan } from '@/controllers/graphql/types/classrooms-plan';
import { CreateClassroomsPlanService } from '@/services/classrooms-plans/create-classrooms-plan';

@Resolver(() => ClassroomsPlan)
export class CreateClassroomsPlanResolver {
  constructor(
    private readonly createClassroomsPlanService: CreateClassroomsPlanService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => ClassroomsPlan)
  async createClassroomsPlan(
    @Args('input') data: CreateClassroomsPlanInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createClassroomsPlanService.execute(data);
    return response;
  }
}
