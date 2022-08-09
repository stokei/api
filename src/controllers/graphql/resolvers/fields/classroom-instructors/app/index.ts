import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { App } from '@/controllers/graphql/types/app';
import { ClassroomInstructor } from '@/controllers/graphql/types/classroom-instructor';
import { ClassroomInstructorModel } from '@/models/classroom-instructor.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

@Resolver(() => ClassroomInstructor)
export class ClassroomInstructorAppResolver {
  constructor(private readonly findAppByIdService: FindAppByIdService) {}

  @ResolveField(() => App)
  app(@Parent() classroomInstructor: ClassroomInstructorModel) {
    return this.findAppByIdService.execute(classroomInstructor.app);
  }
}
