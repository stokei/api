import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ClassroomsLoader } from '@/controllers/graphql/dataloaders/classrooms.loader';
import { Classroom } from '@/controllers/graphql/types/classroom';
import { ClassroomModule } from '@/controllers/graphql/types/classroom-module';
import { ClassroomModuleModel } from '@/models/classroom-module.model';

@Resolver(() => ClassroomModule)
export class ClassroomModuleClassroomResolver {
  constructor(private readonly classroomsLoader: ClassroomsLoader) {}

  @ResolveField(() => Classroom, { nullable: true })
  classroom(@Parent() classroomModule: ClassroomModuleModel) {
    return (
      classroomModule.classroom &&
      this.classroomsLoader.findByIds.load(classroomModule.classroom)
    );
  }
}
