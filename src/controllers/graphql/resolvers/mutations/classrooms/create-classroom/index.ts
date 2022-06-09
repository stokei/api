import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { CreateClassroomInput } from '@/controllers/graphql/inputs/classrooms/create-classroom.input';
import { Classroom } from '@/controllers/graphql/types/classroom';
import { CreateClassroomService } from '@/services/classrooms/create-classroom';

@Resolver(() => Classroom)
export class CreateClassroomResolver {
  constructor(
    private readonly createClassroomService: CreateClassroomService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Classroom)
  async createClassroom(
    @Args('input') data: CreateClassroomInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createClassroomService.execute(data);
    return response;
  }
}
