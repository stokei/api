import { Args, Query, Resolver } from '@nestjs/graphql';

import { CoursesLoader } from '@/controllers/graphql/dataloaders/courses.loader';
import { Course } from '@/controllers/graphql/types/course';
import { CourseNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => Course)
export class CourseResolver {
  constructor(private readonly coursesLoader: CoursesLoader) {}

  @Query(() => Course)
  async course(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const course = await this.coursesLoader.findByIds.load(id);
    if (!course) {
      throw new CourseNotFoundException();
    }
    return course;
  }
}
