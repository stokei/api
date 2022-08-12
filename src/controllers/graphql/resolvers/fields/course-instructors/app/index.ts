import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { CourseInstructor } from '@/controllers/graphql/types/course-instructor';
import { CourseInstructorModel } from '@/models/course-instructor.model';

@Resolver(() => CourseInstructor)
export class CourseInstructorAppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @ResolveField(() => App, { nullable: true })
  app(@Parent() courseInstructor: CourseInstructorModel) {
    return (
      courseInstructor.app &&
      this.appsLoader.findByIds.load(courseInstructor.app)
    );
  }
}
