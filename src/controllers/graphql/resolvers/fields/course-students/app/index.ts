import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { CourseStudent } from '@/controllers/graphql/types/course-student';
import { CourseStudentModel } from '@/models/course-student.model';

@Resolver(() => CourseStudent)
export class CourseStudentAppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @ResolveField(() => App)
  app(@Parent() courseStudent: CourseStudentModel) {
    return (
      courseStudent.app && this.appsLoader.findByIds.load(courseStudent.app)
    );
  }
}
