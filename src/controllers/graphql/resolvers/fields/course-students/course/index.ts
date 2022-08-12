import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { CoursesLoader } from '@/controllers/graphql/dataloaders/courses.loader';
import { Course } from '@/controllers/graphql/types/course';
import { CourseStudent } from '@/controllers/graphql/types/course-student';
import { CourseStudentModel } from '@/models/course-student.model';

@Resolver(() => CourseStudent)
export class CourseStudentCourseResolver {
  constructor(private readonly coursesLoader: CoursesLoader) {}

  @ResolveField(() => Course, { nullable: true })
  course(@Parent() courseStudent: CourseStudentModel) {
    return (
      courseStudent.course &&
      this.coursesLoader.findByIds.load(courseStudent.course)
    );
  }
}
