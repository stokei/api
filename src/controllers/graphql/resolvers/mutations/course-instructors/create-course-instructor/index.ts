import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreateCourseInstructorInput } from '@/controllers/graphql/inputs/course-instructors/create-course-instructor.input';
import { CourseInstructor } from '@/controllers/graphql/types/course-instructor';
import { CreateCourseInstructorService } from '@/services/course-instructors/create-course-instructor';

@Resolver(() => CourseInstructor)
export class CreateCourseInstructorResolver {
  constructor(
    private readonly createCourseInstructorService: CreateCourseInstructorService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => CourseInstructor)
  async createCourseInstructor(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: CreateCourseInstructorInput
  ) {
    const response = await this.createCourseInstructorService.execute({
      ...data,
      app: appId,
      createdBy: currentAccountId
    });
    return response;
  }
}
