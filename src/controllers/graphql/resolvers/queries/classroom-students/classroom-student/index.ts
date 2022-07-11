import { Args, Query, Resolver } from '@nestjs/graphql';

import { ClassroomStudentsLoader } from '@/controllers/graphql/dataloaders/classroom-students.loader';
import { ClassroomStudent } from '@/controllers/graphql/types/classroom-student';
import {
  ClassroomStudentNotFoundException,
  ParamNotFoundException
} from '@/errors';

@Resolver(() => ClassroomStudent)
export class ClassroomStudentResolver {
  constructor(
    private readonly classroomStudentsLoader: ClassroomStudentsLoader
  ) {}

  @Query(() => ClassroomStudent)
  async classroomStudent(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const classroomStudent = await this.classroomStudentsLoader.findByIds.load(
      id
    );
    if (!classroomStudent) {
      throw new ClassroomStudentNotFoundException();
    }
    return classroomStudent;
  }
}
