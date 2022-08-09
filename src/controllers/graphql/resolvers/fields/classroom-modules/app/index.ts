import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { App } from '@/controllers/graphql/types/app';
import { ClassroomModule } from '@/controllers/graphql/types/classroom-module';
import { ClassroomModuleModel } from '@/models/classroom-module.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

@Resolver(() => ClassroomModule)
export class ClassroomModuleAppResolver {
  constructor(private readonly findAppByIdService: FindAppByIdService) {}

  @ResolveField(() => App)
  app(@Parent() classroomModule: ClassroomModuleModel) {
    return this.findAppByIdService.execute(classroomModule.app);
  }
}
