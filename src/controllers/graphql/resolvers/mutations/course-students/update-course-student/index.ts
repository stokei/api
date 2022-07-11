import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { UpdateCourseStudentInput } from '@/controllers/graphql/inputs/course-students/update-course-student.input';
import { CourseStudent } from '@/controllers/graphql/types/course-student';
import { UpdateCourseStudentService } from '@/services/course-students/update-course-student';

@Resolver(() => CourseStudent)
export class UpdateCourseStudentResolver {
  constructor(
    private readonly updateCourseStudentService: UpdateCourseStudentService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => CourseStudent)
  async updateCourseStudent(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: UpdateCourseStudentInput
  ) {
    const response = await this.updateCourseStudentService.execute({
      ...data,
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
