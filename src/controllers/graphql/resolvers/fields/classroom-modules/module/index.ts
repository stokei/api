import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ModulesLoader } from '@/controllers/graphql/dataloaders/modules.loader';
import { ClassroomModule } from '@/controllers/graphql/types/classroom-module';
import { Module } from '@/controllers/graphql/types/module';
import { ClassroomModuleModel } from '@/models/classroom-module.model';

@Resolver(() => ClassroomModule)
export class ClassroomModuleModuleResolver {
  constructor(private readonly modulesLoader: ModulesLoader) {}

  @ResolveField(() => Module)
  module(@Parent() classroomModule: ClassroomModuleModel) {
    return (
      classroomModule.module &&
      this.modulesLoader.findByIds.load(classroomModule.module)
    );
  }
}
