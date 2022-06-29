import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { UpdateCoursesInstructorInput } from '@/controllers/graphql/inputs/courses-instructors/update-courses-instructor.input';
import { CoursesInstructor } from '@/controllers/graphql/types/courses-instructor';
import { UpdateCoursesInstructorService } from '@/services/courses-instructors/update-courses-instructor';

@Resolver(() => CoursesInstructor)
export class UpdateCoursesInstructorResolver {
  constructor(
    private readonly updateCoursesInstructorService: UpdateCoursesInstructorService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => CoursesInstructor)
  async updateCoursesInstructor(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: UpdateCoursesInstructorInput
  ) {
    const response = await this.updateCoursesInstructorService.execute({
      ...data,
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
