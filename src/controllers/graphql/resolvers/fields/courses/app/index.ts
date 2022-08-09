import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Course } from '@/controllers/graphql/types/course';
import { CourseModel } from '@/models/course.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

@Resolver(() => Course)
export class CourseAppResolver {
  constructor(private readonly findAppByIdService: FindAppByIdService) {}

  @ResolveField(() => Course)
  app(@Parent() course: CourseModel) {
    return this.findAppByIdService.execute(course.app);
  }
}
