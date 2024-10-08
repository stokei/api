import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreateCourseStudentInput } from '@/controllers/graphql/inputs/course-students/create-course-student.input';
import { CourseStudent } from '@/controllers/graphql/types/course-student';
import { CreateCourseStudentService } from '@/services/course-students/create-course-student';

@Resolver(() => CourseStudent)
export class CreateCourseStudentResolver {
  constructor(
    private readonly createCourseStudentService: CreateCourseStudentService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => CourseStudent)
  async createCourseStudent(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: CreateCourseStudentInput
  ) {
    const response = await this.createCourseStudentService.execute({
      ...data,
      app: appId,
      createdBy: currentAccountId
    });
    return response;
  }
}
