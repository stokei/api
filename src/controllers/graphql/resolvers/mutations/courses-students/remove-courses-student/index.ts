import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { RemoveCoursesStudentInput } from '@/controllers/graphql/inputs/courses-students/remove-courses-student.input';
import { CoursesStudent } from '@/controllers/graphql/types/courses-student';
import { RemoveCoursesStudentService } from '@/services/courses-students/remove-courses-student';

@Resolver(() => CoursesStudent)
export class RemoveCoursesStudentResolver {
  constructor(
    private readonly removeCoursesStudentService: RemoveCoursesStudentService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => CoursesStudent)
  async removeCoursesStudent(@Args('input') data: RemoveCoursesStudentInput) {
    const response = await this.removeCoursesStudentService.execute(data);
    return response;
  }
}
