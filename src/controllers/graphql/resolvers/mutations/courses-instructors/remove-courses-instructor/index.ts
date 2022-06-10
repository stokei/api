import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { RemoveCoursesInstructorInput } from '@/controllers/graphql/inputs/courses-instructors/remove-courses-instructor.input';
import { CoursesInstructor } from '@/controllers/graphql/types/courses-instructor';
import { RemoveCoursesInstructorService } from '@/services/courses-instructors/remove-courses-instructor';

@Resolver(() => CoursesInstructor)
export class RemoveCoursesInstructorResolver {
  constructor(
    private readonly removeCoursesInstructorService: RemoveCoursesInstructorService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => CoursesInstructor)
  async removeCoursesInstructor(
    @Args('input') data: RemoveCoursesInstructorInput
  ) {
    const response = await this.removeCoursesInstructorService.execute(data);
    return response;
  }
}
