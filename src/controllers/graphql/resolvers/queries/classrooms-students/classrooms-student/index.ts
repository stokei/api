import { Args, Query, Resolver } from '@nestjs/graphql';
import { ClassroomsStudentsLoader } from '@/controllers/graphql/dataloaders/classrooms-students.loader';
import { ClassroomsStudent } from '@/controllers/graphql/types/classrooms-student';
import {
  ClassroomsStudentNotFoundException,
  ParamNotFoundException
} from '@/errors';

@Resolver(() => ClassroomsStudent)
export class ClassroomsStudentResolver {
  constructor(
    private readonly classroomsStudentsLoader: ClassroomsStudentsLoader
  ) {}

  @Query(() => ClassroomsStudent)
  async classroomsStudent(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const classroomsStudent =
      await this.classroomsStudentsLoader.findByIds.load(id);
    if (!classroomsStudent) {
      throw new ClassroomsStudentNotFoundException();
    }
    return classroomsStudent;
  }
}
