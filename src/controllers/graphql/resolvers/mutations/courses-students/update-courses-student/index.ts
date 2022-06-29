import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { UpdateCoursesStudentInput } from '@/controllers/graphql/inputs/courses-students/update-courses-student.input';
import { CoursesStudent } from '@/controllers/graphql/types/courses-student';
import { UpdateCoursesStudentService } from '@/services/courses-students/update-courses-student';

@Resolver(() => CoursesStudent)
export class UpdateCoursesStudentResolver {
  constructor(
    private readonly updateCoursesStudentService: UpdateCoursesStudentService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => CoursesStudent)
  async updateCoursesStudent(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: UpdateCoursesStudentInput
  ) {
    const response = await this.updateCoursesStudentService.execute({
      ...data,
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
