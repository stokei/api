import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ClassroomStudent } from '@/controllers/graphql/types/classroom-student';
import { ClassroomStudentModel } from '@/models/classroom-student.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

@Resolver(() => ClassroomStudent)
export class ClassroomStudentAppResolver {
  constructor(private readonly findAppByIdService: FindAppByIdService) {}

  @ResolveField(() => ClassroomStudent)
  app(@Parent() classroomStudent: ClassroomStudentModel) {
    return this.findAppByIdService.execute(classroomStudent.app);
  }
}
