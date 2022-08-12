import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { ClassroomModule } from '@/controllers/graphql/types/classroom-module';
import { ClassroomModuleModel } from '@/models/classroom-module.model';

@Resolver(() => ClassroomModule)
export class ClassroomModuleAppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @ResolveField(() => App, { nullable: true })
  app(@Parent() classroomModule: ClassroomModuleModel) {
    return (
      classroomModule.app && this.appsLoader.findByIds.load(classroomModule.app)
    );
  }
}
