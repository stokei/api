import { Args, Query, Resolver } from '@nestjs/graphql';

import { CourseInstructorsLoader } from '@/controllers/graphql/dataloaders/course-instructors.loader';
import { CourseInstructor } from '@/controllers/graphql/types/course-instructor';
import {
  CourseInstructorNotFoundException,
  ParamNotFoundException
} from '@/errors';

@Resolver(() => CourseInstructor)
export class CourseInstructorResolver {
  constructor(
    private readonly courseInstructorsLoader: CourseInstructorsLoader
  ) {}

  @Query(() => CourseInstructor)
  async courseInstructor(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const courseInstructor =
      await this.courseInstructorsLoader.findByIds.load(id);
    if (!courseInstructor) {
      throw new CourseInstructorNotFoundException();
    }
    return courseInstructor;
  }
}
