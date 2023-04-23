import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { CoursesLoader } from '@/controllers/graphql/dataloaders/courses.loader';
import { Course } from '@/controllers/graphql/types/course';
import { CourseInstructor } from '@/controllers/graphql/types/course-instructor';
import { CourseInstructorModel } from '@/models/course-instructor.model';

@Resolver(() => CourseInstructor)
export class CourseInstructorCourseResolver {
  constructor(private readonly coursesLoader: CoursesLoader) {}

  @ResolveField(() => Course, { nullable: true })
  course(@Parent() courseInstructor: CourseInstructorModel) {
    return (
      courseInstructor.course &&
      this.coursesLoader.findByIds.load(courseInstructor.course)
    );
  }
}
