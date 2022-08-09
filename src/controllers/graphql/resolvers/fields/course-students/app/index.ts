import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { CourseStudent } from '@/controllers/graphql/types/course-student';
import { CourseStudentModel } from '@/models/course-student.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

@Resolver(() => CourseStudent)
export class CourseStudentAppResolver {
  constructor(private readonly findAppByIdService: FindAppByIdService) {}

  @ResolveField(() => CourseStudent)
  app(@Parent() courseStudent: CourseStudentModel) {
    return this.findAppByIdService.execute(courseStudent.app);
  }
}
