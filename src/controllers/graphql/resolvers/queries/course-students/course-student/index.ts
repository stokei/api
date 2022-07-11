import { Args, Query, Resolver } from '@nestjs/graphql';

import { CourseStudentsLoader } from '@/controllers/graphql/dataloaders/course-students.loader';
import { CourseStudent } from '@/controllers/graphql/types/course-student';
import {
  CourseStudentNotFoundException,
  ParamNotFoundException
} from '@/errors';

@Resolver(() => CourseStudent)
export class CourseStudentResolver {
  constructor(private readonly courseStudentsLoader: CourseStudentsLoader) {}

  @Query(() => CourseStudent)
  async courseStudent(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const courseStudent = await this.courseStudentsLoader.findByIds.load(id);
    if (!courseStudent) {
      throw new CourseStudentNotFoundException();
    }
    return courseStudent;
  }
}
