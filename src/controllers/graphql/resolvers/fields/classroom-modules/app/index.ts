import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ClassroomModule } from '@/controllers/graphql/types/classroom-module';
import { ClassroomModuleModel } from '@/models/classroom-module.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

@Resolver(() => ClassroomModule)
export class ClassroomModuleAppResolver {
  constructor(private readonly findAppByIdService: FindAppByIdService) {}

  @ResolveField(() => ClassroomModule)
  app(@Parent() classroomModule: ClassroomModuleModel) {
    return this.findAppByIdService.execute(classroomModule.app);
  }
}
