import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ClassroomsLoader } from '@/controllers/graphql/dataloaders/classrooms.loader';
import { Classroom } from '@/controllers/graphql/types/classroom';
import { ClassroomStudent } from '@/controllers/graphql/types/classroom-student';
import { ClassroomStudentModel } from '@/models/classroom-student.model';

@Resolver(() => ClassroomStudent)
export class ClassroomStudentClassroomResolver {
  constructor(private readonly classroomsLoader: ClassroomsLoader) {}

  @ResolveField(() => Classroom)
  classroom(@Parent() classroomStudent: ClassroomStudentModel) {
    return (
      classroomStudent.classroom &&
      this.classroomsLoader.findByIds.load(classroomStudent.classroom)
    );
  }
}
