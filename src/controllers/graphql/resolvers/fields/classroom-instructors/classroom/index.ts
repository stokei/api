import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ClassroomsLoader } from '@/controllers/graphql/dataloaders/classrooms.loader';
import { Classroom } from '@/controllers/graphql/types/classroom';
import { ClassroomInstructor } from '@/controllers/graphql/types/classroom-instructor';
import { ClassroomInstructorModel } from '@/models/classroom-instructor.model';

@Resolver(() => ClassroomInstructor)
export class ClassroomInstructorClassroomResolver {
  constructor(private readonly classroomsLoader: ClassroomsLoader) {}

  @ResolveField(() => Classroom, { nullable: true })
  classroom(@Parent() classroomInstructor: ClassroomInstructorModel) {
    return (
      classroomInstructor.classroom &&
      this.classroomsLoader.findByIds.load(classroomInstructor.classroom)
    );
  }
}
