import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CreateCourseStudentInput } from '@/controllers/graphql/inputs/course-students/create-course-student.input';
import { CourseStudent } from '@/controllers/graphql/types/course-student';
import { CreateCourseStudentService } from '@/services/course-students/create-course-student';

@Resolver(() => CourseStudent)
export class CreateCourseStudentResolver {
  constructor(
    private readonly createCourseStudentService: CreateCourseStudentService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => CourseStudent)
  async createCourseStudent(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: CreateCourseStudentInput
  ) {
    const response = await this.createCourseStudentService.execute({
      ...data,
      createdBy: currentAccountId
    });
    return response;
  }
}
