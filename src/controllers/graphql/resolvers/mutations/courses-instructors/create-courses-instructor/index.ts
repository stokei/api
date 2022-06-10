import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

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
    @Args('input') data: CreateCoursesInstructorInput
  ) {
    const response = await this.createCoursesInstructorService.execute(data);
    return response;
  }
}
