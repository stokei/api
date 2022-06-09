import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { CreateCoursesInstructorInput } from '@/controllers/graphql/inputs/courses-instructors/create-courses-instructor.input';
import { CoursesInstructor } from '@/controllers/graphql/types/courses-instructor';
import { CreateCoursesInstructorService } from '@/services/courses-instructors/create-courses-instructor';

@Resolver(() => CoursesInstructor)
export class CreateCoursesInstructorResolver {
  constructor(
    private readonly createCoursesInstructorService: CreateCoursesInstructorService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => CoursesInstructor)
  async createCoursesInstructor(
    @Args('input') data: CreateCoursesInstructorInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createCoursesInstructorService.execute(data);
    return response;
  }
}
