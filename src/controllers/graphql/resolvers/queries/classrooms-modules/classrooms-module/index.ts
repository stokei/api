import { Args, Query, Resolver } from '@nestjs/graphql';
import { ClassroomsModulesLoader } from '@/controllers/graphql/dataloaders/classrooms-modules.loader';
import { ClassroomsModule } from '@/controllers/graphql/types/classrooms-module';
import {
  ClassroomsModuleNotFoundException,
  ParamNotFoundException
} from '@/errors';

@Resolver(() => ClassroomsModule)
export class ClassroomsModuleResolver {
  constructor(
    private readonly classroomsModulesLoader: ClassroomsModulesLoader
  ) {}

  @Query(() => ClassroomsModule)
  async classroomsModule(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const classroomsModule = await this.classroomsModulesLoader.findByIds.load(
      id
    );
    if (!classroomsModule) {
      throw new ClassroomsModuleNotFoundException();
    }
    return classroomsModule;
  }
}
