import { Args, Query, Resolver } from '@nestjs/graphql';

import { ClassroomsInstructorsLoader } from '@/controllers/graphql/dataloaders/classrooms-instructors.loader';
import { ClassroomsInstructor } from '@/controllers/graphql/types/classrooms-instructor';
import {
  ClassroomsInstructorNotFoundException,
  ParamNotFoundException
} from '@/errors';

@Resolver(() => ClassroomsInstructor)
export class ClassroomsInstructorResolver {
  constructor(
    private readonly classroomsInstructorsLoader: ClassroomsInstructorsLoader
  ) {}

  @Query(() => ClassroomsInstructor)
  async classroomsInstructor(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const classroomsInstructor =
      await this.classroomsInstructorsLoader.findByIds.load(id);
    if (!classroomsInstructor) {
      throw new ClassroomsInstructorNotFoundException();
    }
    return classroomsInstructor;
  }
}
