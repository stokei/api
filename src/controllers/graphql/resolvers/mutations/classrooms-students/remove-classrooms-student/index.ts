import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { RemoveClassroomsStudentInput } from '@/controllers/graphql/inputs/classrooms-students/remove-classrooms-student.input';
import { ClassroomsStudent } from '@/controllers/graphql/types/classrooms-student';
import { RemoveClassroomsStudentService } from '@/services/classrooms-students/remove-classrooms-student';

@Resolver(() => ClassroomsStudent)
export class RemoveClassroomsStudentResolver {
  constructor(
    private readonly removeClassroomsStudentService: RemoveClassroomsStudentService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => ClassroomsStudent)
  async removeClassroomsStudent(
    @Args('input') data: RemoveClassroomsStudentInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeClassroomsStudentService.execute(data);
    return response;
  }
}
