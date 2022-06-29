import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CreateCoursesStudentInput } from '@/controllers/graphql/inputs/courses-students/create-courses-student.input';
import { CoursesStudent } from '@/controllers/graphql/types/courses-student';
import { CreateCoursesStudentService } from '@/services/courses-students/create-courses-student';

@Resolver(() => CoursesStudent)
export class CreateCoursesStudentResolver {
  constructor(
    private readonly createCoursesStudentService: CreateCoursesStudentService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => CoursesStudent)
  async createCoursesStudent(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: CreateCoursesStudentInput
  ) {
    const response = await this.createCoursesStudentService.execute({
      ...data,
      createdBy: currentAccountId
    });
    return response;
  }
}
