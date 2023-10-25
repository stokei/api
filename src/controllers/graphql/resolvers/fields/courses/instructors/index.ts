import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { CourseInstructorsLoader } from '@/controllers/graphql/dataloaders/course-instructors.loader';
import { Course } from '@/controllers/graphql/types/course';
import { CourseInstructors } from '@/controllers/graphql/types/course-instructors';
import { CourseModel } from '@/models/course.model';
import { GetOrSetCacheService } from '@/services/cache/get-or-set-cache';

@Resolver(() => Course)
export class CourseCourseInstructorsResolver {
  constructor(
    private readonly courseInstructorsLoader: CourseInstructorsLoader,
    private readonly getOrSetCacheService: GetOrSetCacheService
  ) {}

  @ResolveField(() => CourseInstructors, { nullable: true })
  async instructors(@Parent() course: CourseModel) {
    return await this.getOrSetCacheService.execute(
      CourseCourseInstructorsResolver.name + course.id,
      () => this.courseInstructorsLoader.findByCourseIds.load(course.id)
    );
  }
}
