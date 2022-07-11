import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { UpdateClassroomStudentInput } from '@/controllers/graphql/inputs/classroom-students/update-classroom-student.input';
import { ClassroomStudent } from '@/controllers/graphql/types/classroom-student';
import { UpdateClassroomStudentService } from '@/services/classroom-students/update-classroom-student';

@Resolver(() => ClassroomStudent)
export class UpdateClassroomStudentResolver {
  constructor(
    private readonly updateClassroomStudentService: UpdateClassroomStudentService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => ClassroomStudent)
  async updateClassroomStudent(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: UpdateClassroomStudentInput
  ) {
    const response = await this.updateClassroomStudentService.execute({
      ...data,
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
