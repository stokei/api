import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

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
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: UpdateClassroomsStudentInput
  ) {
    const response = await this.updateClassroomsStudentService.execute({
      ...data,
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
