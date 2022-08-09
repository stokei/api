import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { App } from '@/controllers/graphql/types/app';
import { CourseStudent } from '@/controllers/graphql/types/course-student';
import { CourseStudentModel } from '@/models/course-student.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

@Resolver(() => CourseStudent)
export class CourseStudentAppResolver {
  constructor(private readonly findAppByIdService: FindAppByIdService) {}

  @ResolveField(() => App)
  app(@Parent() courseStudent: CourseStudentModel) {
    return this.findAppByIdService.execute(courseStudent.app);
  }
}
