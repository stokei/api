import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { App } from '@/controllers/graphql/types/app';
import { Course } from '@/controllers/graphql/types/course';
import { CourseModel } from '@/models/course.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

@Resolver(() => Course)
export class CourseAppResolver {
  constructor(private readonly findAppByIdService: FindAppByIdService) {}

  @ResolveField(() => App)
  app(@Parent() course: CourseModel) {
    return this.findAppByIdService.execute(course.app);
  }
}
