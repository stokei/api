import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { RemoveClassroomStudentInput } from '@/controllers/graphql/inputs/classroom-students/remove-classroom-student.input';
import { ClassroomStudent } from '@/controllers/graphql/types/classroom-student';
import { RemoveClassroomStudentService } from '@/services/classroom-students/remove-classroom-student';

@Resolver(() => ClassroomStudent)
export class RemoveClassroomStudentResolver {
  constructor(
    private readonly removeClassroomStudentService: RemoveClassroomStudentService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => ClassroomStudent)
  async removeClassroomStudent(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,,
    @Args('input') data: RemoveClassroomStudentInput
  ) {
    const response = await this.removeClassroomStudentService.execute({
      ...data,
      where: {
        ...data?.where,
        app: appId,
        removedBy: currentAccountId
      }
    });
    return response;
  }
}
