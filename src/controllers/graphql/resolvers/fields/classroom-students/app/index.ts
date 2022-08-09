import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { App } from '@/controllers/graphql/types/app';
import { ClassroomStudent } from '@/controllers/graphql/types/classroom-student';
import { ClassroomStudentModel } from '@/models/classroom-student.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

@Resolver(() => ClassroomStudent)
export class ClassroomStudentAppResolver {
  constructor(private readonly findAppByIdService: FindAppByIdService) {}

  @ResolveField(() => App)
  app(@Parent() classroomStudent: ClassroomStudentModel) {
    return this.findAppByIdService.execute(classroomStudent.app);
  }
}
