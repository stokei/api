import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { UpdateCoursesInstructorInput } from '@/controllers/graphql/inputs/courses-instructors/update-courses-instructor.input';
import { CoursesInstructor } from '@/controllers/graphql/types/courses-instructor';
import { UpdateCoursesInstructorService } from '@/services/courses-instructors/update-courses-instructor';

@Resolver(() => CoursesInstructor)
export class UpdateCoursesInstructorResolver {
  constructor(
    private readonly updateCoursesInstructorService: UpdateCoursesInstructorService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => CoursesInstructor)
  async updateCoursesInstructor(
    @Args('input') data: UpdateCoursesInstructorInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updateCoursesInstructorService.execute(data);
    return response;
  }
}
