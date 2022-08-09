import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { App } from '@/controllers/graphql/types/app';
import { Classroom } from '@/controllers/graphql/types/classroom';
import { ClassroomModel } from '@/models/classroom.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

@Resolver(() => Classroom)
export class ClassroomAppResolver {
  constructor(private readonly findAppByIdService: FindAppByIdService) {}

  @ResolveField(() => App)
  app(@Parent() classroom: ClassroomModel) {
    return this.findAppByIdService.execute(classroom.app);
  }
}
