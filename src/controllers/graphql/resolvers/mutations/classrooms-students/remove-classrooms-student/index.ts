import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { RemoveClassroomsStudentInput } from '@/controllers/graphql/inputs/classrooms-students/remove-classrooms-student.input';
import { ClassroomsStudent } from '@/controllers/graphql/types/classrooms-student';
import { RemoveClassroomsStudentService } from '@/services/classrooms-students/remove-classrooms-student';

@Resolver(() => ClassroomsStudent)
export class RemoveClassroomsStudentResolver {
  constructor(
    private readonly removeClassroomsStudentService: RemoveClassroomsStudentService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => ClassroomsStudent)
  async removeClassroomsStudent(
    @Args('input') data: RemoveClassroomsStudentInput
  ) {
    const response = await this.removeClassroomsStudentService.execute(data);
    return response;
  }
}
