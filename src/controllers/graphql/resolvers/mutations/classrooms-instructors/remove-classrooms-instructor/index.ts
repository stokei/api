import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { RemoveClassroomsInstructorInput } from '@/controllers/graphql/inputs/classrooms-instructors/remove-classrooms-instructor.input';
import { ClassroomsInstructor } from '@/controllers/graphql/types/classrooms-instructor';
import { RemoveClassroomsInstructorService } from '@/services/classrooms-instructors/remove-classrooms-instructor';

@Resolver(() => ClassroomsInstructor)
export class RemoveClassroomsInstructorResolver {
  constructor(
    private readonly removeClassroomsInstructorService: RemoveClassroomsInstructorService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => ClassroomsInstructor)
  async removeClassroomsInstructor(
    @Args('input') data: RemoveClassroomsInstructorInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeClassroomsInstructorService.execute(data);
    return response;
  }
}
