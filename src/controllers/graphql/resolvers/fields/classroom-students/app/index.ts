import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { ClassroomStudent } from '@/controllers/graphql/types/classroom-student';
import { ClassroomStudentModel } from '@/models/classroom-student.model';

@Resolver(() => ClassroomStudent)
export class ClassroomStudentAppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @ResolveField(() => App, { nullable: true })
  app(@Parent() classroomStudent: ClassroomStudentModel) {
    return (
      classroomStudent.app &&
      this.appsLoader.findByIds.load(classroomStudent.app)
    );
  }
}
