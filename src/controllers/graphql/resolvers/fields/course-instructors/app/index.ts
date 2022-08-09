import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { App } from '@/controllers/graphql/types/app';
import { CourseInstructor } from '@/controllers/graphql/types/course-instructor';
import { CourseInstructorModel } from '@/models/course-instructor.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

@Resolver(() => CourseInstructor)
export class CourseInstructorAppResolver {
  constructor(private readonly findAppByIdService: FindAppByIdService) {}

  @ResolveField(() => App)
  app(@Parent() courseInstructor: CourseInstructorModel) {
    return this.findAppByIdService.execute(courseInstructor.app);
  }
}
