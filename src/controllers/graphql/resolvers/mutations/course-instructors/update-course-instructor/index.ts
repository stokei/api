import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { UpdateCourseInstructorInput } from '@/controllers/graphql/inputs/course-instructors/update-course-instructor.input';
import { CourseInstructor } from '@/controllers/graphql/types/course-instructor';
import { UpdateCourseInstructorService } from '@/services/course-instructors/update-course-instructor';

@Resolver(() => CourseInstructor)
export class UpdateCourseInstructorResolver {
  constructor(
    private readonly updateCourseInstructorService: UpdateCourseInstructorService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => CourseInstructor)
  async updateCourseInstructor(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: UpdateCourseInstructorInput
  ) {
    const response = await this.updateCourseInstructorService.execute({
      ...data,
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
