import { Args, Query, Resolver } from '@nestjs/graphql';
import { CoursesInstructorsLoader } from '@/controllers/graphql/dataloaders/courses-instructors.loader';
import { CoursesInstructor } from '@/controllers/graphql/types/courses-instructor';
import {
  CoursesInstructorNotFoundException,
  ParamNotFoundException
} from '@/errors';

@Resolver(() => CoursesInstructor)
export class CoursesInstructorResolver {
  constructor(
    private readonly coursesInstructorsLoader: CoursesInstructorsLoader
  ) {}

  @Query(() => CoursesInstructor)
  async coursesInstructor(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const coursesInstructor =
      await this.coursesInstructorsLoader.findByIds.load(id);
    if (!coursesInstructor) {
      throw new CoursesInstructorNotFoundException();
    }
    return coursesInstructor;
  }
}
