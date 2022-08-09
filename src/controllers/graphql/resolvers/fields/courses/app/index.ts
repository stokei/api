import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { Course } from '@/controllers/graphql/types/course';
import { CourseModel } from '@/models/course.model';

@Resolver(() => Course)
export class CourseAppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @ResolveField(() => App)
  app(@Parent() course: CourseModel) {
    return course.app && this.appsLoader.findByIds.load(course.app);
  }
}
