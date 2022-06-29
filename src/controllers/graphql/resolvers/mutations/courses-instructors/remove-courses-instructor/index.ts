import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

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
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: RemoveCoursesInstructorInput
  ) {
    const response = await this.removeCoursesInstructorService.execute({
      ...data,
      where: {
        ...data?.where,
        removedBy: currentAccountId
      }
    });
    return response;
  }
}
