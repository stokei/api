import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { ClassroomInstructor } from '@/controllers/graphql/types/classroom-instructor';
import { ClassroomInstructorModel } from '@/models/classroom-instructor.model';

@Resolver(() => ClassroomInstructor)
export class ClassroomInstructorAppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @ResolveField(() => App)
  app(@Parent() classroomInstructor: ClassroomInstructorModel) {
    return (
      classroomInstructor.app &&
      this.appsLoader.findByIds.load(classroomInstructor.app)
    );
  }
}
