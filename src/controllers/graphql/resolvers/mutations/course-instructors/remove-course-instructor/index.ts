import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { RemoveCourseInstructorInput } from '@/controllers/graphql/inputs/course-instructors/remove-course-instructor.input';
import { CourseInstructor } from '@/controllers/graphql/types/course-instructor';
import { RemoveCourseInstructorService } from '@/services/course-instructors/remove-course-instructor';

@Resolver(() => CourseInstructor)
export class RemoveCourseInstructorResolver {
  constructor(
    private readonly removeCourseInstructorService: RemoveCourseInstructorService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => CourseInstructor)
  async removeCourseInstructor(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,,
    @Args('input') data: RemoveCourseInstructorInput
  ) {
    const response = await this.removeCourseInstructorService.execute({
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
