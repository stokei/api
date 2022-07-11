import { Args, Query, Resolver } from '@nestjs/graphql';

import { ClassroomModulesLoader } from '@/controllers/graphql/dataloaders/classroom-module s.loader';
import { ClassroomModule } from '@/controllers/graphql/types/classroom-module ';
import {
  ClassroomModuleNotFoundException,
  ParamNotFoundException
} from '@/errors';

@Resolver(() => ClassroomModule)
export class ClassroomModuleResolver {
  constructor(
    private readonly classroomModulesLoader: ClassroomModulesLoader
  ) {}

  @Query(() => ClassroomModule)
  async classroomModule(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const classroomModule = await this.classroomModulesLoader.findByIds.load(
      id
    );
    if (!classroomModule) {
      throw new ClassroomModuleNotFoundException();
    }
    return classroomModule;
  }
}
