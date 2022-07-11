import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { RemoveCourseStudentInput } from '@/controllers/graphql/inputs/course-students/remove-course-student.input';
import { CourseStudent } from '@/controllers/graphql/types/course-student';
import { RemoveCourseStudentService } from '@/services/course-students/remove-course-student';

@Resolver(() => CourseStudent)
export class RemoveCourseStudentResolver {
  constructor(
    private readonly removeCourseStudentService: RemoveCourseStudentService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => CourseStudent)
  async removeCourseStudent(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: RemoveCourseStudentInput
  ) {
    const response = await this.removeCourseStudentService.execute({
      ...data,
      where: {
        ...data?.where,
        removedBy: currentAccountId
      }
    });
    return response;
  }
}
