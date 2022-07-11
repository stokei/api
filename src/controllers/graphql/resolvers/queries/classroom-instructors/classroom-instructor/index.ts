import { Args, Query, Resolver } from '@nestjs/graphql';

import { ClassroomInstructorsLoader } from '@/controllers/graphql/dataloaders/classroom-instructors.loader';
import { ClassroomInstructor } from '@/controllers/graphql/types/classroom-instructor';
import {
  ClassroomInstructorNotFoundException,
  ParamNotFoundException
} from '@/errors';

@Resolver(() => ClassroomInstructor)
export class ClassroomInstructorResolver {
  constructor(
    private readonly classroomInstructorsLoader: ClassroomInstructorsLoader
  ) {}

  @Query(() => ClassroomInstructor)
  async classroomInstructor(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const classroomInstructor =
      await this.classroomInstructorsLoader.findByIds.load(id);
    if (!classroomInstructor) {
      throw new ClassroomInstructorNotFoundException();
    }
    return classroomInstructor;
  }
}
