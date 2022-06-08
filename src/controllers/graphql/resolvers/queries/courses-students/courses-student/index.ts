import { Args, Query, Resolver } from '@nestjs/graphql';
import { CoursesStudentsLoader } from '@/controllers/graphql/dataloaders/courses-students.loader';
import { CoursesStudent } from '@/controllers/graphql/types/courses-student';
import {
  CoursesStudentNotFoundException,
  ParamNotFoundException
} from '@/errors';

@Resolver(() => CoursesStudent)
export class CoursesStudentResolver {
  constructor(private readonly coursesStudentsLoader: CoursesStudentsLoader) {}

  @Query(() => CoursesStudent)
  async coursesStudent(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const coursesStudent = await this.coursesStudentsLoader.findByIds.load(id);
    if (!coursesStudent) {
      throw new CoursesStudentNotFoundException();
    }
    return coursesStudent;
  }
}
