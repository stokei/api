import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CreateCoursesInstructorInput } from '@/controllers/graphql/inputs/courses-instructors/create-courses-instructor.input';
import { CoursesInstructor } from '@/controllers/graphql/types/courses-instructor';
import { CreateCoursesInstructorService } from '@/services/courses-instructors/create-courses-instructor';

@Resolver(() => CoursesInstructor)
export class CreateCoursesInstructorResolver {
  constructor(
    private readonly createCoursesInstructorService: CreateCoursesInstructorService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => CoursesInstructor)
  async createCoursesInstructor(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: CreateCoursesInstructorInput
  ) {
    const response = await this.createCoursesInstructorService.execute({
      ...data,
      createdBy: currentAccountId
    });
    return response;
  }
}
