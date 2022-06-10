import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { UpdateClassroomsStudentInput } from '@/controllers/graphql/inputs/classrooms-students/update-classrooms-student.input';
import { ClassroomsStudent } from '@/controllers/graphql/types/classrooms-student';
import { UpdateClassroomsStudentService } from '@/services/classrooms-students/update-classrooms-student';

@Resolver(() => ClassroomsStudent)
export class UpdateClassroomsStudentResolver {
  constructor(
    private readonly updateClassroomsStudentService: UpdateClassroomsStudentService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => ClassroomsStudent)
  async updateClassroomsStudent(
    @Args('input') data: UpdateClassroomsStudentInput
  ) {
    const response = await this.updateClassroomsStudentService.execute(data);
    return response;
  }
}
