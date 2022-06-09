import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { UpdateClassroomsInstructorInput } from '@/controllers/graphql/inputs/classrooms-instructors/update-classrooms-instructor.input';
import { ClassroomsInstructor } from '@/controllers/graphql/types/classrooms-instructor';
import { UpdateClassroomsInstructorService } from '@/services/classrooms-instructors/update-classrooms-instructor';

@Resolver(() => ClassroomsInstructor)
export class UpdateClassroomsInstructorResolver {
  constructor(
    private readonly updateClassroomsInstructorService: UpdateClassroomsInstructorService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => ClassroomsInstructor)
  async updateClassroomsInstructor(
    @Args('input') data: UpdateClassroomsInstructorInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updateClassroomsInstructorService.execute(data);
    return response;
  }
}
