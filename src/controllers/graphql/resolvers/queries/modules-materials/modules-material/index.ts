import { Args, Query, Resolver } from '@nestjs/graphql';

import { ModulesMaterialsLoader } from '@/controllers/graphql/dataloaders/modules-materials.loader';
import { ModulesMaterial } from '@/controllers/graphql/types/modules-material';
import {
  ModulesMaterialNotFoundException,
  ParamNotFoundException
} from '@/errors';

@Resolver(() => ModulesMaterial)
export class ModulesMaterialResolver {
  constructor(
    private readonly modulesMaterialsLoader: ModulesMaterialsLoader
  ) {}

  @Query(() => ModulesMaterial)
  async modulesMaterial(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const modulesMaterial = await this.modulesMaterialsLoader.findByIds.load(
      id
    );
    if (!modulesMaterial) {
      throw new ModulesMaterialNotFoundException();
    }
    return modulesMaterial;
  }
}
